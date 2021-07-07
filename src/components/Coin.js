import styled from "styled-components";
import React, { useContext } from 'react';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Coin = ({ coinTicker, price }) => {
  const colors = useContext(ColorThemeContext);

  const getColors = (price) => {
    if (price < 0.5)
      return [colors.brightRed, "darkred"];
    return [colors.green, "green"];
  }

  const [bgColor, fontColor] = getColors(Math.random());


  return (
    <Container colors={colors} fontColor={fontColor} bgColor={bgColor}>
      <CoinTicker>{coinTicker.toUpperCase()}</CoinTicker>
      <Price>{price}</Price>
    </Container>
  );
};

const Container = styled.div`
  width: 10em;
  border-radius: 10px;
  margin: 1em;
  text-align: center;
  color: green;
  padding-top: 1em;
  padding-bottom: 1em;
  /* color: ${props => props.colors.white}; */
  color: ${props => props.fontColor};
  /* color: green; */
  background-color: ${props => props.bgColor};
  /* background-color: green; */
  `;

const CoinTicker = styled.div`
  font-weight: bold;
  /* color: green; */
`;

const Price = styled.div`
  margin-top: 0.5em;
  /* color: green; */
`;

export default Coin;