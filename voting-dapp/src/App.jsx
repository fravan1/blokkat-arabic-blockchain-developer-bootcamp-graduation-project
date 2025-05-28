import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { CONTRACT_ADDRESS, VotingABI } from "./constants/config";
import { ethers } from "ethers";

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error, pendingConnector } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voteStatus, setVoteStatus] = useState("");
  const [newProposal, setNewProposal] = useState("");
  const [createStatus, setCreateStatus] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  
  // Fetch proposals from contract
  const fetchProposals = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed!");
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, provider);
      
      const total = await contract.getProposalsCount();
      console.log("Total proposals:", total.toString()); // Debug log
  
      const proposalsArray = [];
      for (let i = 0; i < total; i++) {
        const [name, count] = await contract.getproposal(i);
        proposalsArray.push({ name, count: Number(count) });
      }
      setProposals(proposalsArray);
    } catch (err) {
      console.error("Failed to fetch proposals:", err);
    } finally {
      setLoading(false);
    }
  };
  const checkIfOwner = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, provider);
      
  
      const contractOwner = await contract.owner();
      if (address){
      setIsOwner(contractOwner.toLowerCase() === address.toLowerCase());}
    } catch (err) {
        setIsOwner(false);
    }
  };
  // Vote on a proposal
  const voteFor = async (index) => {
    setVoteStatus("Sending vote...");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
      const tx = await contract.vote(index);
      await tx.wait();
      setVoteStatus(" Vote successful!");
      fetchProposals(); // refresh results
    } catch (err) {
      console.error(err);
      setVoteStatus(" Vote failed or already voted");
    }
  };

  const create_proposal = async () => {
    setCreateStatus("Sending proposal...");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
  
      const tx = await contract.create_proposal(newProposal);
      await tx.wait();
  
      setCreateStatus("✅ Proposal created!");
      setNewProposal(""); // clear input
      fetchProposals();   // refresh proposals
    } catch (err) {
      setCreateStatus("❌ Only the contract owner can create proposals.");
    }
  };
  
  useEffect(() => {
    if (isConnected) {
      fetchProposals();
      checkIfOwner();
    }
  }, [isConnected]);

  return (
  <div className="p-6 text-center font-mono">
    {!isConnected ? (
     <>
     {connectors
     .filter((connector) => connector.name !== "Injected")
     .map((connector) => (
     <button
     disabled={false}
     key={connector.uid}
     onClick={() => connect({ connector })}
     className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
     >
      Connect {connector.name}
      {isPending && pendingConnector?.id === connector.id && " (connecting)"}
      </button>
      ))}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      </>
      ) : (
      <>
      <button
      onClick={() => disconnect()}
      className="m-2 px-4 py-2 bg-gray-300 rounded"
      >
        Disconnect
      </button>
      
      {isOwner ? (
         <p className="text-green-600">✅ You are the contract owner</p>
         ) : (
         <p className="text-yellow-600">⚠️ You are NOT the contract owner</p>
      )}
     {isOwner &&(
      <div className="my-4">
        <h3 className="font-semibold">Create a new proposal</h3>
        <input
        type="text"
        placeholder="Proposal name"
        value={newProposal}
        onChange={(e) => setNewProposal(e.target.value)}
        className="border p-1 rounded mr-2"
        />
        <button
        onClick={create_proposal}
        className="px-3 py-1 bg-purple-600 text-white rounded"
        >
          Submit
        </button>
        <p className="text-sm mt-1">{createStatus}</p>
        </div>
        )}
        </>
      )}
      
      <hr className="my-4" />
      <h2 className="text-lg font-bold mb-2"> Proposals</h2>
      {loading && <p>Loading proposals...</p>}
      {proposals.map((p, idx) => (
      <div key={idx} className="border p-2 my-2 rounded">
        <p>
          <strong>{p.name}</strong> — Votes: {p.count}
        </p>
        <button
        onClick={() => voteFor(idx)}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Vote
        </button>
      </div>
    ))}
    <p className="mt-4">{voteStatus}</p>
    </div>
  );
}