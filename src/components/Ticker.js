import styled from "styled-components";
import React, { useState, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, type, price, priceDifference, percentage }) => {
  const COLORS = useContext(ColorThemeContext);
  const [opacity, setOpacity] = useState(false);
  const [blueBarRight, setBlueBarRight] = useState(false);

  let bgColor, fontColor;
  if (priceDifference <= 0) {
    bgColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    bgColor = COLORS.green;
    fontColor = COLORS.basicGreen;
    priceDifference = "+" + priceDifference;
  }

  const handleOnClick = () => {
    console.log("got click")
    setOpacity(true);
  }

  const handleMouseUp = () => {
    setOpacity(false);
  }

  const handleDragOver = () => {
    setBlueBarRight(true);
  }

  const handleDragLeave = () => {
    setBlueBarRight(false);
  }

  // TODO: Put invisible "hit boxes" inbetween tickers. Have them highlight when mouse is over.
  // This way range can be larger and it will feel more correct since the mouse will need to be on a hitzone instead of over a ticker.

  return (
    <Container colors={COLORS} fontColor={fontColor} bgColor={bgColor} opacity={opacity} blueBarRight={blueBarRight} draggable="true" onMouseDown={handleOnClick} onMouseUp={handleMouseUp} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <DropTickerIndicator blueBarRight={blueBarRight}></DropTickerIndicator>
      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <PriceChange>
        {priceDifference} ({percentage}%)
      </PriceChange>
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
  opacity: ${props => props.opacity ? "0.3" : "1"};
  cursor: move;
`;

const DropTickerIndicator = styled.div`
  position: absolute;
  border: 1px solid blue;
  width: 100%;
  height: 4em;
  transform: translate(-2.2%, 0);
  border-left: ${props => props.blueBarRight ? "4px solid yellow" : ""};
  /* border-left: 4px solid yellow; */
`;

const CoinTicker = styled.div`
  font-weight: bold;
`;

const Price = styled.div`
  margin-top: 0.5em;
`;

const PriceChange = styled.div`
  margin-top: 0.2rem;
  font-size: 0.9rem;
`;

export default Ticker;
