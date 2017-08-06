
var VoteToken = artifacts.require("VoteToken.sol");
var VoteTokenController = artifacts.require("VoteTokenController.sol");
var ProposalToAcceptDABOwnership = artifacts.require("ProposalToAcceptDABOwnership.sol");
var ProposalToSetDABFormula = artifacts.require("ProposalToSetDABFormula.sol");
var ProposalToAddLoanPlanFormula = artifacts.require("ProposalToAddLoanPlanFormula.sol");
var ProposalToDisableLoanPlanFormula = artifacts.require("ProposalToDisableLoanPlanFormula.sol");
var ProposalToTransferDABOwnership = artifacts.require("ProposalToTransferDABOwnership.sol");

let duration = 30 * 24 * 60 * 60; // proposal duration
// This should be a real DABDao address, otherwise migration will fail.
let DABDaoAddress = "0x89dca61ef69325eb8784988876bb77ea3e77632e";
let DABFormulaAddress = "0x4c700842958bb18aebf1a13dce31a106f5574a79";
let AddDABLoanPlanFormulaAddress = "0x6618e656af995c0b004fba3320feb507d14700ac";
let DisableDABLoanPlanFormulaAddress = "0x6618e656af995c0b004fba3320feb507d14700ac";
let NewDABDaoAddress = "0xc32cf3b91b31f200c750aa471fa574229ba1ceb1";

let chooser = 1;

var Proposal;

module.exports = async (deployer) => {

  await deployer.deploy(VoteToken, "Vote Token", "VOT", 18);
  await deployer.deploy(VoteTokenController, VoteToken.address);

  if(chooser == 0){
    Proposal = ProposalToAcceptDABOwnership;
    await deployer.deploy(Proposal, DABDaoAddress, VoteTokenController.address, "0x0", duration);
  } else if (chooser == 1){
    Proposal = ProposalToSetDABFormula;
    await deployer.deploy(Proposal, DABDaoAddress, VoteTokenController.address, DABFormulaAddress, duration);
  } else if (chooser == 2){
    Proposal = ProposalToAddLoanPlanFormula;
    await deployer.deploy(Proposal, DABDaoAddress, VoteTokenController.address, AddDABLoanPlanFormulaAddress, duration);
  } else if (chooser == 3){
    Proposal = ProposalToDisableLoanPlanFormula;
    await deployer.deploy(Proposal, DABDaoAddress, VoteTokenController.address, DisableDABLoanPlanFormulaAddress, duration);
  } else if (chooser == 4){
    Proposal = ProposalToTransferDABOwnership;
    await deployer.deploy(Proposal, DABDaoAddress, VoteTokenController.address, NewDABDaoAddress, duration);
  } else {
    throw("Unsupported proposal.");
  }


  await VoteToken.deployed().then(async (instance) => {
    await instance.transferOwnership(VoteTokenController.address);
  });

  await VoteTokenController.deployed().then(async (instance) => {
    await instance.acceptTokenOwnership();
  });

  await VoteTokenController.deployed().then(async (instance) => {
    await instance.transferOwnership(Proposal.address);
  });

  await Proposal.deployed().then(async (instance) => {
    await instance.acceptVoteTokenControllerOwnership();
  });

};
