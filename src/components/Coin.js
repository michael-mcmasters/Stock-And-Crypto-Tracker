import styled from "styled-components";
import React, { useContext } from 'react';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Coin = ({ coinTicker, price }) => {
  const colors = useContext(ColorThemeContext);

  const getTickerColors = (price) => {
    if (price < 0.5)
      return [colors.brightRed, colors.darkRed];
    return [colors.green, colors.regularGreen];
  }

  const [bgColor, fontColor] = getTickerColors(Math.random());


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
  border: 1px solid ${props => props.fontColor};
  color: ${props => props.fontColor};
  background-color: ${props => props.bgColor};
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