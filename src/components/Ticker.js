import styled from "styled-components";
import React, { useState, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, type, price, priceDifference, percentage }) => {
  const COLORS = useContext(ColorThemeContext);
  const [display, setDisplay] = useState("block");
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
    // setDisplay("none");
  }

  const handleDragOver = () => {
    setBlueBarRight(true);
  }

  const handleDragLeave = () => {
    setBlueBarRight(false);
  }

  return (
    <Container colors={COLORS} fontColor={fontColor} bgColor={bgColor} display={display} blueBarRight={blueBarRight} draggable="true" onMouseDown={handleOnClick} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
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
  /* border-right: 1px solid blue; */
  border-right: ${props => props.blueBarRight ? "4px solid blue" : ""};
  display: ${props => props.display};
  cursor: move;
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
