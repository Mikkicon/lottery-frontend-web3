import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled, * as other from "styled-components";

import "./Slot.css";

const LotteryScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 100px;
`;

const SlotWindow = styled.span`
  display: inline-block;
  font-size: 64px;
  width: 1em;
  height: 1em;
  border: 2px inset red;
  vertical-align: middle;
  margin: 100px 10px;
`;

const Cylinder = styled.span<{ duration?: number; animationFunction?: string }>`
  position: relative;
  z-index: -1;
  display: block;
  margin-top: 0.5em;
  animation-duration: ${(props) => props.duration ?? 0}s;
  animation-name: rotating;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
`;

const getTranslateZ = (total = 0) => {
  if (total < 6) return 1;
  return total / 6 < 2 ? 2 : total / 6;
};
const SlotItem = styled.span<{ rotateXDeg: number; translateZ: number }>`
  position: absolute;
  top: -0.5em;
  left: 0;
  display: block;
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: 1;
  backface-visibility: hidden;
  transform: rotateX(${({ rotateXDeg }) => rotateXDeg}deg)
    translateZ(${({ translateZ }) => translateZ}em);
`;

const Slot = () => {
  const [prizePool, setPrizePool] = useState(0);
  const [duration, setDuration] = useState(20);
  const [amount, setAmount] = useState("");
  const cylinderRef = useRef<HTMLSpanElement>(null);
  const [winner, setWinner] = useState<number>(-1);
  const [players, setPlayers] = useState<string[]>([]);

  function handleEnter() {
    // if (!amount) return;

    const newEmoji = `&#1285${Math.floor(Math.random() * 100)};`;
    setPlayers((prevState) => [...prevState, newEmoji]);
    setPrizePool((prev) => Math.floor(prev * 10 + 1) / 10);
  }

  function handleSpin() {
    setDuration(1);
  }

  useEffect(() => {
    if (duration === 1)
      setTimeout(() => {
        setDuration(0);
        setWinner(Math.floor(Math.random() * players.length));
      }, 1000);
  }, [duration, players.length]);

  useEffect(() => {
    if (winner >= 0) {
      const rotateXBy = -winner! * (360 / players.length);
      cylinderRef!.current!.style.transform = `rotateX(${rotateXBy}deg)`;
    }
  }, [players.length, winner]);

  return (
    <LotteryScreen>
      <div style={{ backdropFilter: "blur(10px)", paddingBottom: 20 }}>
        <h1>Lottery</h1>
        <p>Total players: {players.length}</p>
        <p>Prize pool: {prizePool} ether</p>
        <div>
          <div>
            <label htmlFor="">Amount</label>
            <br />
            <input
              name="amount"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
            />
            <button onClick={handleEnter}>Enter</button>
          </div>
          {winner > -2 ? <button onClick={handleSpin}>Spin</button> : null}
          <div>
            {winner >= 0 ? (
              <p>{winner} has won!</p>
            ) : (
              <p>spin to choose winner</p>
            )}
          </div>
        </div>
      </div>
      <SlotWindow>
        <Cylinder ref={cylinderRef} duration={duration}>
          {players.map((symbol, index) => {
            console.log(index, index * (360 / players.length));

            return (
              <SlotItem
                dangerouslySetInnerHTML={{ __html: symbol }}
                key={index}
                rotateXDeg={index * (360 / players.length)}
                translateZ={getTranslateZ(players.length)}
              />
            );
          })}
        </Cylinder>
      </SlotWindow>
    </LotteryScreen>
  );
};
export default Slot;
