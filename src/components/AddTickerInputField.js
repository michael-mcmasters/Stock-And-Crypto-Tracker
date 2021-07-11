import { detect } from 'detect-browser';
import React, { useState, useContext } from 'react';
import styled from "styled-components"
import { ColorThemeContext } from './custom_hooks/ColorThemeContext';

const AddTickerInputField = ({ handleAddTicker }) => {
  const browser = detect();
  const colors = useContext(ColorThemeContext);
  const [tickerName, setTickerName] = useState('');
  const [tickerType, setTickerType] = useState('stock');

  const handleOnClick = (tickerInput, typeInput) => {
    if (tickerInput == null || typeInput == null || tickerInput == "" || typeInput == null)
      return;
    setTickerName("");
    handleAddTicker(tickerInput.toUpperCase(), typeInput);
  }

  return (
    <Container>
      <InputContainer>
        <Input colors={colors} placeholder={"Ticker..."} value={tickerName} onInput={e => setTickerName(e.target.value)}></Input>
        <Select browser={browser} onChange={e => setTickerType(e.target.value)}>
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
        </Select>
      </InputContainer>
      <Button colors={colors} onClick={() => handleOnClick(tickerName, tickerType)}>
        +
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const InputContainer = styled.div`
  margin: 2rem 1.6rem 0 auto;
`;

const Input = styled.input`
  width: 4rem;
  height: 1.5rem;
  border: none;
  border-right: 1px solid black;
  border-radius: 7px 0 0 7px;
  text-align: center;
  
  /* Hide placeholder text when clicked */
  :focus::placeholder {
    color: transparent;
  }
`;

const Select = styled.select`
  height: 1.6rem;
  padding-left: 0.4rem;
  border: none;
  border-radius: 0 7px 7px 0;
  width: ${props => props.browser.name == "safari" ? "3.5rem" : ""};
  -webkit-appearance: ${props => props.browser.name == "safari" ? "none" : ""};
`;

// ToDo: Check if Safari and if so, set to webkit-appearance: none.

const Button = styled.button`
  border: none;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.colors.blue};
  color: white;
  font-size: 2em;
  margin: 0 1rem 0 0;
`;

export default AddTickerInputField;