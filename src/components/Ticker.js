import styled from "styled-components";
import React, { useContext } from 'react';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, type, price, prevPrice, priceDifference, percentage, getTickerFontAndBGColors }) => {

  const colors = useContext(ColorThemeContext);
  const [bgColor, fontColor] = getTickerFontAndBGColors(price, prevPrice);

  return (
    <Container colors={colors} fontColor={fontColor} bgColor={bgColor}>
      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <div>{priceDifference} ({percentage}%)</div>
    </Container>
  );
};

const Container = styled.div`
      margin: 1em 1em;
      padding: 1em 0;
      border: 1px solid ${props => props.fontColor};
      border-radius: 10px;
      width: 10em;
      color: ${props => props.fontColor};
      background-color: ${props => props.bgColor};
      text-align: center;
`;

const CoinTicker = styled.div`
      font-weight: bold;
`;

const Price = styled.div`
      margin-top: 0.5em;
`;

export default Ticker;