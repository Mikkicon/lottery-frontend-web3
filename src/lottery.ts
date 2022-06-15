import web3 from "./web3";
import { AbiItem } from "web3-utils/types";
export const address = "0x9abcDD1FBc267388D0E866a175ff4139cb3D0365";

export type LotteryMethods = {
  enterCompetition: any;
  getPlayers: any;
  manager: any;
  pickWinner: any;
  playersAddresses: any;
};

export const abi: AbiItem[] = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
    payable: true,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "ChooseWinner",
    type: "event",
  },
  {
    inputs: [],
    name: "enterCompetition",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
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
    constant: true,
  },
];

export default new web3.eth.Contract(abi, address);
