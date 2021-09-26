import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Popup = () => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <Container colors={COLORS}>
      <Text colors={COLORS}>
        Sorry, unable to fetch that ticker.
      </Text>
      <Button colors={COLORS}>
        Okay
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  -webkit-transform:translateX(-50%);
  border: 1px solid red;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${props => props.colors.purple};
  z-index: 1;
  cursor: pointer;
`;

const Text = styled.p`
  
`;

const Button = styled.button`
  display: block;
  /* margin: 0.5em; */
  margin-left: auto;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.colors.blue};
  color: ${props => props.colors.pureWhite};
  cursor: pointer;
`;

export default Popup;