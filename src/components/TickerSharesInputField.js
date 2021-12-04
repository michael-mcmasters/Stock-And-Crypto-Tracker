import React from 'react';
import styled, { css } from "styled-components";

const TickerSharesInputField = ({visible, fontColor, shares, handleUpdateShares}) => {
  
  return (
    <Shares
      type="number"
      visible={visible}
      fontColor={fontColor}
      value={shares}
      onChange={handleUpdateShares}
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