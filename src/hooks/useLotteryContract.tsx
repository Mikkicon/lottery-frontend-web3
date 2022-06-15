import web3 from "../web3";
import lottery from "../lottery";
import { useEffect, useState } from "react";

type Address = string;
type InitialData = [string, string[], string, string[]];

export function useLotteryContract() {
  const [currentAccount, setCurrentAccount] = useState<Address>();
  const [manager, setManager] = useState<Address>();
  const [players, setPlayers] = useState<Address[]>([]);
  const [winner, setWinner] = useState<Address>();
  const [contractBalance, setContractBalance] = useState<string>("");
  console.log({ winner });

  const isManager = currentAccount === manager;

  useEffect(() => {
    fetchInitialData();
    listenEvents();
  }, []);

  async function fetchInitialData() {
    const [manager, players, balance, accounts]: InitialData =
      await Promise.all([
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        web3.eth.getBalance(lottery.options.address),
        web3.eth.getAccounts(),
      ]);

    setManager(manager);
    setPlayers(players);
    setCurrentAccount(accounts[0]);
    setContractBalance(web3.utils.fromWei(balance, "ether"));
  }

  function listenEvents() {
    window.ethereum.on("accountsChanged", function () {
      web3.eth.getAccounts().then(([account]) => setCurrentAccount(account));
    });

    lottery.events
      .ChooseWinner()
      .on("data", (event: any) => {
        const chosenWinner = event?.returnValues?.winner;
        if (chosenWinner) setWinner(chosenWinner);
      })
      .on("error", console.error);
  }

  async function enter(amount: string) {
    const sendConfig = {
      from: currentAccount,
      value: web3.utils.toWei(amount, "ether"),
    };
    await lottery.methods.enterCompetition().send(sendConfig);
    const [players, contractBalance]: [string[], string] = await Promise.all([
      lottery.methods.getPlayers().call(),
      web3.eth.getBalance(lottery.options.address),
    ]);
    setPlayers(players);
    setContractBalance(web3.utils.fromWei(contractBalance, "ether"));
  }

  async function pickWinner() {
    await lottery.methods
      .pickWinner()
      .send({ from: currentAccount })
      .catch(alert);
    fetchInitialData();
  }

  return {
    currentAccount,
    manager,
    players,
    contractBalance,
    winner,
    isManager,
    enter,
    pickWinner,
  };
}
