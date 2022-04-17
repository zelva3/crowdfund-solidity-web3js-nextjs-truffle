const CrowdFund = artifacts.require('CrowdFund');

module.exports = async function (deployer){

    await deployer.deploy(CrowdFund);

}