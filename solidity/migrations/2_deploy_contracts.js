
var VoteToken = artifacts.require("VoteToken.sol");
var VoteTokenController = artifacts.require("VoteTokenController.sol");
var ProposalToAcceptDABOwnership = artifacts.require("ProposalToAcceptDABOwnership.sol");

let duration = 30 * 24 * 60 * 60; // proposal duration
let DABDaoAddress = "0xef21e4d61602ed39b10314f60024363ba3ed6e86";
let proposalContractAddress = "0x0";

module.exports = async (deployer) => {

  await deployer.deploy(VoteToken, "Vote Token", "VOT", 18);
  await deployer.deploy(VoteTokenController, VoteToken.address);
  await deployer.deploy(ProposalToAcceptDABOwnership, DABDaoAddress, VoteTokenController.address, proposalContractAddress, duration);

  await VoteToken.deployed().then(async (instance) => {
    await instance.transferOwnership(VoteTokenController.address);
  });

  await VoteTokenController.deployed().then(async (instance) => {
    await instance.acceptTokenOwnership();
  });

  await VoteTokenController.deployed().then(async (instance) => {
    await instance.transferOwnership(ProposalToAcceptDABOwnership.address);
  });

  await ProposalToAcceptDABOwnership.deployed().then(async (instance) => {
    await instance.acceptVoteTokenControllerOwnership();
  });

};
