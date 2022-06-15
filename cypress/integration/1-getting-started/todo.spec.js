/// <reference types="cypress" />
import Web3 from "web3";
import { provider } from "ganache";

import LotteryObject from "../../../src/lottery";

describe("example to-do app", () => {
  let web3;

  beforeEach(function () {
    cy.fixture("variables").then((variables) => {
      this.variables = variables;
    });
    cy.fixture("local-abi").then((abi) => {
      this.abi = abi;
    });
    cy.on("window:before:load", (window) => {
      const provider = new Web3.providers.HttpProvider("http://localhost:8545");
      web3 = new Web3(provider);
      window.web3 = web3;
    });
  });

  it("displays two todo items by default", function () {
    console.log(this.variables, this.abi);
    cy.stub(LotteryObject, "Lottery", function () {
      console.log("this");
      return new web3.eth.Contract(
        this.abi,
        this.variables["contract-address"]
      );
    });
    cy.visit("http://localhost:3000");
  });
});
