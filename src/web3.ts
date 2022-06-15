import Web3 from "web3";

if (window.ethereum) window.ethereum.request({ method: "eth_requestAccounts" });
// @ts-ignore
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : new Web3();

export default web3;
