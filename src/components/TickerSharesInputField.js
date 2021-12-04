import React, { useRef, useEffect } from 'react';
import styled, { css } from "styled-components";

const TickerSharesInputField = ({visible, fontColor, shares, handleUpdateShares}) => {
  
  const sharesElement = useRef(null);
  
  useEffect(() => {
    const exitInputFieldOnButton = (event) => {
      if (event.keyCode === 13 || event.keyCode === 27) {       // Enter or Escape key
        sharesElement.current.blur();
      }
    }
    document.addEventListener("keydown", exitInputFieldOnButton);

    return () => document.removeEventListener("keydown", exitInputFieldOnButton);
  }, [])
  
  
  const handleUserInput = (event) => {
    const num = Number(event.target.value);
    if (!isNaN(num)) {
      handleUpdateShares(num);
    }
  }
  
  return (
    <Shares
      input="text"
      ref={sharesElement}
      visible={visible}
      fontColor={fontColor}
      value={shares}
      onChange={handleUserInput}
    />
  );
};

const Shares = styled.input`
  width: 35%;
  border: none;
  border-radius: 10px;
  text-align: right;
  color: ${props => props.fontColor};
  background-color: rgba(255, 255, 255, 0);
  
  ${props => props.visible && css`
    color: black;  
    background-color: rgba(255, 255, 255, 0.3);
  `}
  
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default TickerSharesInputField;