import styled, { keyframes } from "styled-components";

const scaleUp = keyframes`
    20%{
        background-color: #fff;
        transform: scaleY(1.5);
    }

    40%{
        transform: scaleY(1);
    }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  font-size: 12px;
`;

export const Bar = styled.span`
  display: inline-block;
  width: ${(props) => props.wB1 || "3"}px;
  height: ${(props) => props.hB1 || "20"}px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  animation: ${scaleUp} 1s linear infinite;

  &:nth-child(2) {
    height: ${(props) => props.hB2 || 35}px;
    margin: 0 5px;
    animation-delay: 0.25s;
  }

  &:nth-child(3) {
    width: ${(props) => props.wB3 || "3"}px;
    height: ${(props) => props.hB3 || "20"}px;
    animation-delay: 0.5s;
  }
`;

export const LoaderText = styled.p`
  margin-top: 10px;
  color: #fff;
  font-size: 1.1rem;
  text-transform: capitalize;
  font-weight: 800;
`;
