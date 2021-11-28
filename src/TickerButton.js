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
  height: 1rem;
  width: 1rem;
  padding: 0rem;
  
  visibility: hidden;
  opacity: 0;
  ${props => props.visible == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
  
  transition: background-color 0.2s;
  ${props => props.pressed == true && css`
    background-color: ${props => props.fontColor};
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