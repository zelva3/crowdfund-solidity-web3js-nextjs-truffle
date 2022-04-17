import Project from '../src/abis/Project.json';
import web3 from './web3';

// const networkId = await web3.eth.net.getId();
// const CrowdFund_Contract = new web3.eth.Contract(CrowdFund.abi, CrowdFund.networks[networkId].address)
const Project_Contract = (address) =>{
    const contract_address = new web3.eth.Contract(
        Project.abi,
        address);
    return contract_address
}

export default Project_Contract;