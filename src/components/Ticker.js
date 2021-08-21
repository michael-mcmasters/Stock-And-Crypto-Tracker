import styled, { css } from "styled-components";
import React, { useState, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, index, type, price, priceDifference, percentage, setItemDrugOver, handleTickerReorder }) => {
  const COLORS = useContext(ColorThemeContext);
  const [beingDragged, setBeingDragged] = useState(false);
  const [hitboxDetectingTicker, setHitboxDetectingTicker] = useState(false);

  let bgColor, fontColor;
  if (priceDifference <= 0) {
    bgColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    bgColor = COLORS.green;
    fontColor = COLORS.basicGreen;
    priceDifference = "+" + priceDifference;
  }

  const handleOnClick = (event) => {
    setBeingDragged(true);
  }

  const handleDragEnd = (event) => {
    console.log(event)
    setBeingDragged(false);
    handleTickerReorder(index);
  }

  const handleHitboxDetectTicker = () => {
    setHitboxDetectingTicker(true)
    setItemDrugOver(index);
  }

  const handleHitboxUndetectTicker = () => {
    setHitboxDetectingTicker(false)
  }

  return (
    <Container draggable="true"
      hitboxDetectingTicker={hitboxDetectingTicker}
      onMouseDown={(e) => handleOnClick(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      colors={COLORS}
      fontColor={fontColor}
      bgColor={bgColor}
      beingDragged={beingDragged}
    >
      <HitBox onDragOver={handleHitboxDetectTicker} onDragLeave={handleHitboxUndetectTicker} />
      <DropTickerIndicator hitboxUnderTicker={hitboxDetectingTicker}></DropTickerIndicator>
      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <PriceChange>
        {priceDifference} ({percentage}%)
      </PriceChange>
    </Container >
  );
};

const Container = styled.div`
  position: relative;
  margin: 1em 1em;
  padding: 1em 0;
  border: 2px solid ${(props) => props.fontColor};
  border-radius: 10px;
  width: 10em;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  text-align: center;
  cursor: move;

  ${props => props.beingDragged && css`
    opacity: 0.3;
  `}
  
  ${props => props.hitboxDetectingTicker && css`
    border: 2px solid yellow;
  `}
`;

// Determines where a ticker can be dragged to. Not used for appearance. Uncomment the border to view hitbox area. 
const HitBox = styled.div`
  /* border: 1px solid blue; */
  position: absolute;
  width: 12em;
  height: 8em;
  bottom: -1em;
  left: -1.3em;
  z-index: 1;
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
