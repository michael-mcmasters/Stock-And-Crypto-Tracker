import styled from "styled-components";
import React, { useState, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, type, price, priceDifference, percentage }) => {
  const COLORS = useContext(ColorThemeContext);
  const [beingDragged, setBeingDragged] = useState(false);
  const [hitboxUnderTicker, setHitboxUnderTicker] = useState(false);

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
    setBeingDragged(true);
  }

  const handleMouseUp = () => {
    setBeingDragged(false);
  }

  const handleDragOver = () => {
    console.log("over")
    setHitboxUnderTicker(true);
  }

  const handleDragLeave = () => {
    setHitboxUnderTicker(false);
  }

  // TODO: Put invisible "hit boxes" inbetween tickers. Have them highlight when mouse is over.
  // This way range can be larger and it will feel more correct since the mouse will need to be on a hitzone instead of over a ticker.

  return (
    <Container draggable="true" colors={COLORS} fontColor={fontColor} bgColor={bgColor} beingDragged={beingDragged} onMouseDown={handleOnClick} onMouseUp={handleMouseUp}>
      <HitBox onDragOver={handleDragOver} onDragLeave={handleDragLeave} />
      <DropTickerIndicator hitboxUnderTicker={hitboxUnderTicker}></DropTickerIndicator>
      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <PriceChange>
        {priceDifference} ({percentage}%)
      </PriceChange>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 1em 1em;
  padding: 1em 0;
  border: 1px solid ${(props) => props.fontColor};
  border-radius: 10px;
  width: 10em;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  text-align: center;
  opacity: ${props => props.beingDragged ? "0.3" : "1"};
  cursor: move;
`;

const HitBox = styled.div`
  position: absolute;
  width: 12em;
  height: 8em;
  bottom: -1em;
  left: -1.3em;
  z-index: 1;
  /* border: 1px solid blue; */   /* Uncomment to view hitbox */
`;

const DropTickerIndicator = styled.div`
  position: absolute;
  height: 4em;
  left: -1.15em;
  border-left: ${props => props.hitboxUnderTicker ? "4px solid yellow" : ""};
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
