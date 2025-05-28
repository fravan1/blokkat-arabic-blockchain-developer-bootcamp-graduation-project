// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "../src/voting.sol";

contract VotingTest is Test {
    Voting public voting;
    address public owner = address(this); // The deployer, acts as owner
    address public voter1 = address(0x1); // Simulated user

    function setUp() public {
        // Deploy contract — owner is address(this)
        voting = new Voting();
        // Add proposals from owner

        voting.create_proposal("Proposal A");
        voting.create_proposal("Proposal B");

        //validate these proposals
        (string memory name0,) = voting.getproposal(0);
        (string memory name1,) = voting.getproposal(1);

        assertEq(name0, "Proposal A");
        assertEq(name1, "Proposal B");
    }

    function testauthority() public view {
        assertEq(voting.owner(), owner);
    }

    // Test that only the owner can create a proposal
    function testOnlyOwnerCanCreate() public {
        vm.prank(voter1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, voter1));
        voting.create_proposal("Unauthorized Proposal");
    }

    //Test that a proposal is created successfully by the owner
    function testProposalCreatedCorrectly() public {
        voting.create_proposal("Proposal C");
        (string memory name, uint256 count) = voting.getproposal(2);
        assertEq(name, "Proposal C");
        assertEq(count, 0);
    }

    //Test that a user can vote once
    function testUserCanVote() public {
        vm.prank(voter1);
        voting.vote(0);
        (, uint256 vote_count) = voting.getproposal(0);
        assertEq(vote_count, 1);
    }

    //Test that a user cannot vote twice
    function testUserCannotVoteTwice() public {
        vm.prank(voter1);
        voting.vote(0);

        vm.prank(voter1);
        vm.expectRevert("Already voted");
        voting.vote(1);
    }

    //Test that vote fails for invalid proposal index
    function testInvalidProposalVoteFails() public {
        vm.prank(voter1);
        vm.expectRevert("proposal doesn't exist");
        voting.vote(99);
    }
}
