import React, { useState } from 'react';
import styled, { css } from "styled-components";

const TickerButton = ({ visible, fontColor, innerText, handleOnClick}) => {
  const [pressed, setPressed] = useState(false);
  
  return (
    <SharesButton 
      visible={visible}
      fontColor={fontColor}
      pressed={pressed}
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 100);
        
        handleOnClick();
      }}
    >
      {innerText}
    </SharesButton>
  );
};

const SharesButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.fontColor};
  color: ${props => props.fontColor};
  border-radius: 10px;
  width: 0.9rem;
  height: 0.9rem;
  margin: 0 0.15rem;
  padding: 0;
  
  visibility: hidden;
  opacity: 0;
  ${props => props.visible == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
  
  transition: background-color 0.2s;
  ${props => props.pressed == true && css`
    background-color: black;
  `}
  
  ${props => !props.pressed == true && css`
    background-color: transparent;
  `}
  
  &:hover {
    cursor: pointer;
    border-color: black;
  }
`;

export default TickerButton;