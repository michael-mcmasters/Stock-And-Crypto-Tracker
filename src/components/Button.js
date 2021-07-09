import React, { useState, useContext } from 'react';
import styled from "styled-components"
import { ColorThemeContext } from './custom_hooks/ColorThemeContext';

const Button = ({ handleAddTicker }) => {
  const colors = useContext(ColorThemeContext);
  const [tickerInput, setTickerInput] = useState('');
  const [typeInput, setTypeInput] = useState('');

  // ToDo: Click button, then dropdown for stock/crypto pops up.
  // And an input field to enter the ticker.

  const handleOnClick = (tickerInput, typeInput) => {
    if (tickerInput == null || typeInput == null || tickerInput == "" || typeInput == null)
      return;
    handleAddTicker(tickerInput, typeInput)
  }

  return (
    <Container>
      <Input colors={colors} onInput={e => setTickerInput(e.target.value)}></Input>
      <Input colors={colors} onInput={e => setTypeInput(e.target.value)}></Input>
      <But colors={colors} onClick={() => handleOnClick(tickerInput, typeInput)}>
        +
      </But>
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const Input = styled.input`

`;

const But = styled.button`
  border: none;
  border-radius: 9999px;
  width: 2em;
  height: 2em;
  background-color: ${props => props.colors.blue};
  color: white;
  font-size: 2em;
`;

export default Button;