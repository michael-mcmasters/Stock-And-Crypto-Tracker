import styled, { css, keyframes } from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Ticker = ({ tickerName, index, type, price, priceDifference, percentage, setTickerDrugOver, deleteSwappedAnimations, swapTickers, swapped }) => {
  const COLORS = useContext(ColorThemeContext);
  const [beingDragged, setBeingDragged] = useState(false);
  const [hitboxDetectingTicker, setHitboxDetectingTicker] = useState(false);

  // Edge case fix to make sure tickers don't have beingDragged styling when user drops them.
  useEffect(() => {
    const handleMouseUp = () => setBeingDragged(false);
    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  });

  let bgColor, fontColor;
  if (priceDifference <= 0) {
    bgColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    bgColor = COLORS.green;
    fontColor = COLORS.basicGreen;
    priceDifference = "+" + priceDifference;
  }

  const handleDragStart = () => {
    deleteSwappedAnimations();
    setBeingDragged(true);
  }

  const handleDragEnd = () => {
    setBeingDragged(false);
    swapTickers(index);
  }

  const handleHitboxDetectTicker = () => {
    setHitboxDetectingTicker(true)
    setTickerDrugOver(index);
  }

  const handleHitboxUndetectTicker = () => {
    setHitboxDetectingTicker(false)
  }

  return (
    <Container
      draggable="true"
      hitboxDetectingTicker={hitboxDetectingTicker}
      onMouseDown={handleDragStart}
      onDragEnd={handleDragEnd}
      colors={COLORS}
      fontColor={fontColor}
      bgColor={bgColor}
      beingDragged={beingDragged}
      swapped={swapped}
    >

      {/* Hitbox is used to detect other tickers being dragged over this ticker */}
      <HitBox onDragOver={handleHitboxDetectTicker} onDragLeave={handleHitboxUndetectTicker} />
      <DropIndicator hitboxDetectingTicker={hitboxDetectingTicker} />

      <CoinTicker>{tickerName}</CoinTicker>
      <Price>${price}</Price>
      <PriceChange>
        {priceDifference} ({percentage}%)
      </PriceChange>
    </Container >
  );
};

const FlashYellowAnimation = keyframes`
  50% { background-color: yellow; }
`;

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
  
  ${props => props.swapped == true && css`
    animation-name: ${FlashYellowAnimation};
    animation-duration: 0.8s;
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

const DropIndicator = styled.div`
  position: absolute;
  height: 4em;
  left: -1.15em;
  border-left: ${props => props.hitboxDetectingTicker ? "4px solid yellow" : ""};
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
