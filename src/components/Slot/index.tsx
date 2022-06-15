import { useEffect, useRef, useState } from "react";
import { useLotteryContract } from "../../hooks/useLotteryContract";
import { LotteryScreen, Cylinder, SlotWindow, SlotItem } from "./styles";

const getTranslateZ = (total = 0) => {
  if (total < 6) return 1;
  return total / 6 < 2 ? 2 : total / 6;
};

const generateEmoji = () => `&#1285${Math.floor(Math.random() * 100)};`;

export type Player = { symbol: string; address: string };
const Slot = () => {
  const [duration, setDuration] = useState(10);
  const [amount, setAmount] = useState<number>(0);
  const cylinderRef = useRef<HTMLSpanElement>(null);
  const [winnerWithEmoji, setWinnerWithEmoji] = useState<Player>();
  const [playersWithEmoji, setPlayersWithEmoji] = useState<Player[]>([]);
  const [enterStatus, setEnterStatus] = useState<string>("");
  const {
    currentAccount,
    isManager,
    players,
    manager,
    contractBalance,
    winner,
    enter,
    pickWinner,
  } = useLotteryContract();
  console.log({ winnerWithEmoji, winner });

  async function handleEnter() {
    setEnterStatus("Entering a competition...");
    await enter(`${amount}`);
    setEnterStatus("You've successfully entered");
    setTimeout(() => setEnterStatus(""), 1000);

    setPlayersWithEmoji(
      players.map((address) => ({ address, symbol: generateEmoji() }))
    );
  }

  function handlePickWinner() {
    setDuration(1);
    pickWinner();
  }

  useEffect(
    function onPlayersUpdateSetEmojis() {
      if (players)
        setPlayersWithEmoji(
          players.map((address) => ({ address, symbol: generateEmoji() }))
        );
    },
    [players]
  );

  useEffect(
    function onWinnerChosenStopRotating() {
      if (winner) {
        const wrappedWinner = { address: winner, symbol: generateEmoji() };
        setPlayersWithEmoji([wrappedWinner]);
        setWinnerWithEmoji(wrappedWinner);
        setDuration(0);
      }
    },
    [winner]
  );

  useEffect(
    function onWinnerRotateToWinner() {
      if (winnerWithEmoji?.address) {
        const rotateToWinner =
          -winnerWithEmoji! * (360 / playersWithEmoji.length);
        cylinderRef!.current!.style.transform = `rotateX(${rotateToWinner}deg)`;
      }
    },
    [playersWithEmoji.length, winnerWithEmoji]
  );

  return (
    <LotteryScreen>
      <div style={{ backdropFilter: "blur(10px)", paddingBottom: 20 }}>
        <h1>🎰Lottery🎰</h1>
        <div>
          {currentAccount ? (
            <div>
              <label>Amount</label>
              <br />
              <input
                name="amount"
                type="number"
                step={0.0005}
                min={0.0005}
                value={amount}
                onChange={({ target }) => setAmount(parseFloat(target.value))}
              />
              {enterStatus ? (
                <p>{enterStatus}</p>
              ) : (
                <button disabled={amount < 0.0005} onClick={handleEnter}>
                  Enter
                </button>
              )}
            </div>
          ) : null}
          <ManagerSection
            hasPlayers={!!players.length}
            isManager={isManager}
            winner={winnerWithEmoji}
            handlePickWinner={handlePickWinner}
          />
        </div>
      </div>
      <SlotWindow>
        <Cylinder ref={cylinderRef} duration={duration}>
          {winnerWithEmoji ? (
            <SlotItem
              dangerouslySetInnerHTML={{ __html: winnerWithEmoji.symbol }}
              rotateXDeg={0}
              translateZ={0}
            />
          ) : (
            playersWithEmoji.map(({ symbol }, index) => (
              <SlotItem
                dangerouslySetInnerHTML={{ __html: symbol }}
                key={index}
                rotateXDeg={index * (360 / playersWithEmoji.length)}
                translateZ={getTranslateZ(playersWithEmoji.length)}
              />
            ))
          )}
        </Cylinder>
      </SlotWindow>
      <InfoSection
        currentAccount={currentAccount}
        manager={manager}
        players={players}
        contractBalance={contractBalance}
      />
    </LotteryScreen>
  );
};

function InfoSection({
  currentAccount,
  manager,
  players,
  contractBalance,
}: any) {
  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-6)}`;

  return (
    <div
      style={{
        position: "fixed",
        textAlign: "start",
        top: 0,
        right: 0,
        backdropFilter: "blur(10px)",
      }}
    >
      <p>
        <b>Manager address:</b> {manager && formatAddress(manager)}
      </p>
      <p>
        <b>Your address:</b> {currentAccount && formatAddress(currentAccount)}
      </p>
      <p>
        <b>Total players:</b> {players.length}
      </p>
      <p>
        <b>Prize pool:</b> {contractBalance} ether
      </p>
    </div>
  );
}

type ManagerSectionProps = {
  isManager: boolean;
  winner?: Player;
  hasPlayers: boolean;
  handlePickWinner: () => void;
};
function ManagerSection({
  isManager,
  winner,
  hasPlayers,
  handlePickWinner,
}: ManagerSectionProps) {
  if (!isManager) return null;
  return (
    <>
      {winner || !hasPlayers ? null : (
        <button onClick={handlePickWinner}>Pick winner</button>
      )}
      <div>
        {winner ? (
          <p>
            <span
              style={{ fontSize: 40 }}
              dangerouslySetInnerHTML={{ __html: winner.symbol }}
            ></span>
            {winner.address} has won!
          </p>
        ) : null}
      </div>
    </>
  );
}

export default Slot;
