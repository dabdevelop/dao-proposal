pragma solidity ^0.4.11;

import '../Owned.sol';

contract IProposal is IOwned{

    function getProposalContract() public returns (address) {}
    function propose() public {}
    function vote(address, uint256) public {}
    function execute() public {}
    function redeem() public {}
}
