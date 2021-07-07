import React, { useContext } from 'react';
import styled from "styled-components"
import { ColorThemeContext } from './custom_hooks/ColorThemeContext';

const Button = () => {
  const colors = useContext(ColorThemeContext);

  // ToDo: Click button, then dropdown for stock/crypto pops up.
  // And an input field to enter the ticker.

  return (
    <Container>
      <Input colors={colors}></Input>
      <But colors={colors}>
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