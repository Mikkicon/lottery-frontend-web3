import styled, { keyframes } from "styled-components";

export const rotate = keyframes`
from {
  transform: rotateX(360deg);
}
to {
  transform: rotateX(0deg);
}
`;

export const LotteryScreen = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 100px;
`;

export const SlotWindow = styled.span`
  display: inline-block;
  font-size: 64px;
  width: 1em;
  height: 1em;
  border: 2px inset red;
  vertical-align: middle;
  margin: 100px 10px;
`;

export const Cylinder = styled.span<{
  duration?: number;
  animationFunction?: string;
}>`
  position: relative;
  z-index: -1;
  display: block;
  margin-top: 0.5em;
  animation-duration: ${(props) => props.duration ?? 0}s;
  animation-name: ${rotate};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
`;

export const SlotItem = styled.span<{ rotateXDeg: number; translateZ: number }>`
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
