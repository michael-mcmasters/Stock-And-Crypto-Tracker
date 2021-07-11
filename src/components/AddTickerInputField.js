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
      <InputContainer>
        <Input colors={colors} onInput={e => setTickerInput(e.target.value)}></Input>
        <Select onChange={e => setTypeInput(e.target.value)}>
          <option value="stocks">Stock</option>
          <option value="crypto">Crypto</option>
        </Select>
      </InputContainer>
      <Button colors={colors} onClick={() => handleOnClick(tickerInput, typeInput)}>
        +
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  margin: 1rem 1.9rem 0 auto;
`;

const Input = styled.input`
  height: 2rem;
  border: none;
  border-right: 1px solid black;
`;

const Select = styled.select`
  height: 2.1rem;
  border: none;
`;

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