import { detect } from 'detect-browser';
import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { css } from "styled-components"
import { ColorThemeContext } from './custom_hooks/ColorThemeContext';

const AddTickerInputField = ({ handleAddTicker }) => {
  const browser = detect();
  const colors = useContext(ColorThemeContext);

  const inputElement = useRef();
  const [tickerName, setTickerName] = useState("");
  const [tickerType, setTickerType] = useState('stock');

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.keyCode === 13 && tickerName !== '') {    // Enter Key
        handleAddTicker(tickerName, tickerType);
        setTickerName("");
        inputElement.current.blur();
      }
      else if (event.keyCode === 27) {                    // Escape Key
        setTickerName("");
        inputElement.current.blur();
      }
    }
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleAddTicker, tickerName, tickerType])

  const handleOnClick = (inputtedTicker, inputtedType) => {
    if (inputtedTicker === null || inputtedType === null || inputtedTicker === "" || inputtedType === null)
      return;
    handleAddTicker(inputtedTicker, inputtedType);
    setTickerName("");
  }

  return (
    <Container>
      <InputContainer>
        <Input ref={inputElement} browser={browser} colors={colors} placeholder={"Ticker..."} value={tickerName} onInput={e => setTickerName(e.target.value.toUpperCase())}></Input>
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
  border: none;
  border-right: 1px solid black;
  border-radius: 7px 0 0 7px;
  text-align: center;
  
  /* Hide placeholder text when clicked */
  :focus::placeholder {
    color: transparent;
  }
  
  height: 1.4rem;
  /* For some reason, the height changes slightly when the window width changes.
     This looks at all widths for Chrome and Safari to force the correct height */
  ${props => props.browser.name === 'chrome' && css`
    height: 1.4rem;
    
    @media (max-width: 650px) {
      height: 1.5rem;
    }
  `}
  
  ${props => props.browser.name === 'safari' && css`
    height: 1.48rem;
      
    @media (max-width: 850px) {
      height: 1.49rem;
    }
      
    @media (max-width: 650px) {
      height: 1.45rem;
    }
  `}
`;

const Select = styled.select`
  height: 1.6rem;
  padding-left: 0.4rem;
  border: none;
  border-radius: 0 7px 7px 0;
  width: ${(props) => (props.browser.name === "safari" ? "3.5rem" : "")};
  -webkit-appearance: ${(props) => (props.browser.name === "safari" ? "none" : "")};
`;

const Button = styled.button`
  border: none;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.colors.blue};
  color: ${props => props.colors.pureWhite};
  font-size: 2em;
  margin: 0 1rem 0 0;
`;

export default AddTickerInputField;