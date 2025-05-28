// SPDX-Licence-Identifer: MIT
pragma solidity 0.8.20;

// this contract allows owner to create voting and others vote
import "@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable{
    
    struct Proposal {
        string name;
        uint vote_count;
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasvoted;
    constructor() Ownable(msg.sender){}



    function create_proposal (string memory _name) public onlyOwner {
        // create new proposal by owner only
        proposals.push(Proposal ({
            name: _name,
            vote_count: 0
        }));
    }



    function vote(uint proposal_ID) public {
        require (proposal_ID < proposals.length, "proposal doesn't exist");
        require (!hasvoted[msg.sender], "Already voted");

        proposals[proposal_ID].vote_count += 1;
        hasvoted[msg.sender] = true;
    }


    function getproposal(uint proposal_ID) public view returns (string memory name, uint vote_count){
        require (proposal_ID < proposals.length , "proposal doesn't exist");
        Proposal storage proposal = proposals[proposal_ID];
        return (proposal.name, proposal.vote_count);
    }

    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }


}