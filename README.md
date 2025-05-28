# 🗳️ Voting DApp  
**Blokkat Arabic Blockchain Developer Bootcamp - Graduation Project**

---

## 📌 About This Project

This is a decentralized voting platform built using Solidity and deployed to the Scroll Sepolia testnet. It allows connected users to view proposals and vote for them on-chain. The frontend is built with React + Vite and integrated using Wagmi v2 and Ethers.js.

---

## 🗂️ Directory Structure

```.
├── contracts/ # Solidity smart contracts
│ └── Voting.sol
├── script/ # Deployment scripts
│ └── Deploy.s.sol
├── test/ # Foundry tests
│ └── Voting.t.sol
├── frontend/ # React frontend (Vite + Wagmi)
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── constants/config.js
│ └── index.html
├── out/ # Foundry compiled artifacts
├── abi/ # ABI used by frontend
├── .env
└── README.md
```
---

## 🧩 Design Patterns Used

✅ Two technical design patterns implemented from bootcamp:

1. **Access Control - Owner Only**
   - `createProposal()` can only be called by the contract owner using `Ownable`.

2. **Read vs Write Separation**
   - `getproposal()` is a view function for reading.
   - `vote()` is a state-changing function that writes.

---

## 🔐 Security Measures Implemented

✅ Two security measures implemented from course:

1. **Function Access Control**
   - Only owner can call restricted functions (`onlyOwner` modifier from OpenZeppelin).

2. **Input Validation**
   - Voting loop ensures index is valid; fallback if index does not exist.

---

## 🔗 Important Links & Addresses

- ✅ **Smart Contract (verified)**:https://sepolia.scrollscan.com/address/0x0e03b8B47A37370D5126AA7ED07B7aAB41964076
- ✅ **Frontend Hosted**:https://classy-lebkuchen-f6d223.netlify.app/
- ✅ **Contract ABI**: `frontend/src/constants/VotingABI.json`

---

## 🧪 How to Run Smart Contract Tests

```bash
forge test
```
Run from the root folder. Tests are located in test/Voting.t.sol. Requires Foundry.

---
## 🚀 How to Run the Frontend Locally
Clone the repository

Go to frontend folder:

```bash
cd voting-dapp
```
Install dependencies:

```bash
npm install
```
Start the dev server:

```bash
npm run dev
```
Open browser at http://localhost:5173

## 🔐 .env Configuration

Create a .env file in root with:

```env
PRIVATE_KEY=your_deployer_private_key
RPC_URL=https://sepolia-rpc.scroll.io
ETHERSCAN_API_KEY=your_etherscan_api_key
```
---
## 🎥 Demo
Watch the demo of the voting DApp in action:

📽️ https://drive.google.com/file/d/1cjYpHUJaDL3p6eMXUj9a4--Btu52GWuF/view?usp=sharing

---
## ✅ Status
 ✅ Smart contract written and tested

 ✅ Contract deployed to Scroll Sepolia

 ✅  Frontend structured and integrated

 ✅ Wallet connect logic working

 ✅ Proposals rendering

 ✅ Final testing + hosting

---

## 💡 Built With
Solidity + Foundry

React + Vite

wagmi@2 + ethers.js

Scroll Sepolia testnet

app.netlify.app

---
## 🙌 Thanks
This project is part of the Blokkat Arabic Blockchain Developer Bootcamp,
