import CrowdFund from '../src/abis/CrowdFund.json';
import web3 from '../ethereum/web3';

// const networkId = await web3.eth.net.getId();
// const CrowdFund_Contract = new web3.eth.Contract(CrowdFund.abi, CrowdFund.networks[networkId].address)
const CrowdFund_Contract = new web3.eth.Contract(
    CrowdFund.abi,
    "0xE78ce6A346eBe7e0F73ae101843aC2Df366b8c1A")

export default CrowdFund_Contract;