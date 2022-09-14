import React from "react";
import { LoaderWrapper,Loader,LoaderText,Bar } from "./LoaderIcon.style";

const LoaderIcon = (props) => {
  const {wB1,hB1,wB2,hB2,wB3,hB3,text,heightContainer,barsColor} = props;
  return (
    <LoaderWrapper heightContainer={heightContainer}>
      <Loader heightContainer={heightContainer}>
        <Bar hB1={hB1} barsColor={barsColor}></Bar>
        <Bar hB2={hB2} barsColor={barsColor}></Bar>
        <Bar hB3={hB3} barsColor={barsColor}></Bar>
      </Loader>
      {text && (
        <LoaderText>
            {text}
        </LoaderText>
      )}
    </LoaderWrapper>
  );
};

export default LoaderIcon;
