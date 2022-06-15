import web3 from "./web3";
import { AbiItem } from "web3-utils/types";
export const address = "0x40fbCd57956aDf6C54d348ACA33A95233ce1624d";

export const abi: AbiItem[] = [
  { inputs: [], stateMutability: "payable", type: "constructor" },
  {
    inputs: [],
    name: "enterCompetition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "playersAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export default new web3.eth.Contract(abi, address);
