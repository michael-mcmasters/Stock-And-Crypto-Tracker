import React, { useState, useContext } from 'react';
import styled from "styled-components"
import { ColorThemeContext } from './custom_hooks/ColorThemeContext';

const AddTickerInputField = ({ handleAddTicker }) => {
  const colors = useContext(ColorThemeContext);
  const [tickerInput, setTickerInput] = useState('');
  const [typeInput, setTypeInput] = useState('stocks');


  const handleOnClick = (tickerInput, typeInput) => {
    if (tickerInput == null || typeInput == null || tickerInput == "" || typeInput == null)
      return;
    handleAddTicker(tickerInput, typeInput);
  }

  return (
    <Container>
      <Input colors={colors} onInput={e => setTickerInput(e.target.value)}></Input>
      <Select onChange={e => setTypeInput(e.target.value)}>
        <option value="stocks">Stock</option>
        <option value="crypto">Crypto</option>
      </Select>
      <Button colors={colors} onClick={() => handleOnClick(tickerInput, typeInput)}>
        +
      </Button>
    </Container>
  );
};

const Container = styled.div`
  /* border: 1px solid red; */
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 1.7rem;
  width: auto;
  margin-left: auto;
`;

const Select = styled.select`
  height: 2.1rem;
  width: auto;
`;

const Button = styled.button`
  border: none;
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.colors.blue};
  color: white;
  font-size: 2em;
  margin-left: 2rem;
  justify-self: flex-end;
  align-self: flex-end;
`;

export default AddTickerInputField;