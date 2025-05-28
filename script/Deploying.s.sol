// SPDX-Licence-Identifer: MIT
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import "../src/voting.sol";

contract Deployvoting is Script{
    function run() external {
        //Start broadcasting transactions
        vm.startBroadcast();


        //Deploy the voting cotract
        Voting voting = new Voting();

        //Stop broadcasting
        vm.stopBroadcast();
    }
}