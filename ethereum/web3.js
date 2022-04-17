import Web3 from 'web3';


let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and MetaMask is running
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
} else {
    // We are in the server Or Metamask in not installed in the browser
    const provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(provider);
}

export default web3;