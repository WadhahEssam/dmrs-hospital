// this is the constructor ( so it hav to be upper case )
import Web3 from 'web3';

// to hijack the provider from the web3 provider of the metamax app ( metamax is injecting this provider to every page you visit )
const web3 = new Web3(window.web3.currentProvider);

export default web3;