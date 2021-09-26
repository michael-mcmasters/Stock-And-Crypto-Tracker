import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Popup = ({ handlePopupClick }) => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <Container colors={COLORS}>
      <Text colors={COLORS}>
        Sorry, unable to fetch that ticker.
      </Text>
      <Button colors={COLORS} onClick={handlePopupClick}>
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
  padding: 1rem 1.3rem;
  border: 2px solid ${props => props.colors.darkPurple};
  border-radius: 10px;
  box-shadow: 15px 15px 10px rgba(0, 0, 0, 0.8);
  background-color: ${props => props.colors.purple};
  z-index: 1;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  color: ${props => props.colors.pureWhite};
`;

const Button = styled.button`
  display: block;
  font-size: 1.1rem;
  margin-left: auto;
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.colors.blue};
  color: ${props => props.colors.pureWhite};
  cursor: pointer;
`;

export default Popup;