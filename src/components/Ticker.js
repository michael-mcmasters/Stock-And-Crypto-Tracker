import styled from "styled-components";
import React, { useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, type, price, prevPrice, priceDifference, percentage }) => {
  const COLORS = useContext(ColorThemeContext);

  const getFontAndBGColor = (price, prevPrice) => {
    if (price < prevPrice) return [COLORS.brightRed, COLORS.darkRed];
    else return [COLORS.green, COLORS.basicGreen];
  };

  const formatPriceDifference = (priceDifference) => {
    if (priceDifference < 0) return priceDifference;
    else return "+" + priceDifference;
  };

  const [bgColor, fontColor] = getFontAndBGColor(price, prevPrice);
  priceDifference = formatPriceDifference(priceDifference);

  return (
    <Container colors={COLORS} fontColor={fontColor} bgColor={bgColor}>
      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <div>
        {priceDifference} ({percentage}%)
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 1em 1em;
  padding: 1em 0;
  border: 1px solid ${(props) => props.fontColor};
  border-radius: 10px;
  width: 10em;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  text-align: center;
`;

const CoinTicker = styled.div`
  font-weight: bold;
`;

const Price = styled.div`
  margin-top: 0.5em;
`;

export default Ticker;
