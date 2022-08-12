import React from "react";
import { LoaderWrapper,Loader,LoaderText,Bar } from "./LoaderIcon.style";

const LoaderIcon = (props) => {
  const {wB1,hB1,wB2,hB2,wB3,hB3,text} = props;
  return (
    <LoaderWrapper>
      <Loader>
        <Bar hB1={hB1}></Bar>
        <Bar hB2={hB2}></Bar>
        <Bar hB3={hB3}></Bar>
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
