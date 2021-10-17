import styled, { css, keyframes } from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";


const DELETED_ANIMATION_LENGTH = 300;   // milliseconds


const Ticker = ({ tickerName, index, type, loading, price, priceDifference, percentage, handleDeleteTicker,
  dragAndDropHandlers, allowDragAndDrop, beingDragged, hitboxDetectingDraggedItem, swapped }) => {

  const COLORS = useContext(ColorThemeContext);
  const { handleDragStart, handleDragEnd, handleHitboxEnter, handleHitboxLeave } = dragAndDropHandlers;
  const [ showXButton, setShowXButton ] = useState(false);
  const [ beingDeleted, setBeingDeleted ] = useState(false);
  
  const handleClickedDelete = () => {
    if (loading) return;
    
    setTimeout(() => handleDeleteTicker(index), DELETED_ANIMATION_LENGTH);
    setBeingDeleted(true);
  }

  let bgColor, fontColor;
  if (priceDifference <= 0) {
    bgColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    bgColor = COLORS.green;
    fontColor = COLORS.basicGreen;
    priceDifference = "+" + priceDifference;
  }

  return (
    <Container
      onMouseEnter={() => loading ? "" : setShowXButton(true)}
      onMouseLeave={() => setShowXButton(false)}

      draggable={allowDragAndDrop}
      onDragStart={() => { setShowXButton(false); handleDragStart(index); }}
      onDragEnd={() => handleDragEnd(index)}
      hitboxDetectingDraggedItem={hitboxDetectingDraggedItem}

      colors={COLORS}
      fontColor={fontColor}
      bgColor={bgColor}
      beingDeleted={beingDeleted}
      beingDragged={beingDragged}
      swapped={swapped}
    >

      <XButton
        colors={COLORS}
        fontColor={fontColor}
        showXButton={showXButton}
        onClick={handleClickedDelete}
      >
        &#x2715;
      </XButton>


      {/* Hitbox is used to detect other tickers being dragged over this ticker */}
      <HitBox onDragOver={(event) => handleHitboxEnter(event, index)} onDragLeave={() => handleHitboxLeave(index)} />
      <DropIndicator hitboxDetectingDraggedItem={hitboxDetectingDraggedItem} />

      <CoinTicker>{tickerName}</CoinTicker>
      {loading ? (
        <ClipLoader />
      ) : (
        <>
          <Price>{'$' + price}</Price>
          <PriceChange>
            {priceDifference} ({percentage}%)
          </PriceChange>
        </>
      )}

    </Container >
  );
};

const FlashYellowAnimation = keyframes`
  50% { background-color: yellow; }
`;

const DeletedAnimation = keyframes`
  100% { opacity: 0; }
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
  cursor: ${props => props.draggable ? "move" : ""};

  ${props => props.beingDeleted && css`
    animation-name: ${DeletedAnimation};
    animation-duration: 0.3s;
  `}
  
  ${props => props.beingDragged && css`
    opacity: 0.3;
  `}
  
  ${props => props.hitboxDetectingDraggedItem && css`
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
  border-left: ${props => props.hitboxDetectingDraggedItem ? "4px solid yellow" : ""};
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

// const XButton = styled.button`
//   position: absolute;
//   top: -0.5rem;
//   left: 9rem;
//   border: none;
//   width: 1.5rem;
//   height: 1.5rem;
//   font-size: 0.75rem;
//   border-radius: 9999px;
//   background-color: ${props => props.colors.red};
//   border: 1px solid ${props => props.colors.darkRed};
//   cursor: pointer;

//   visibility: hidden;
//   opacity: 0;
//   ${props => props.showXButton == true && css`
//     visibility: visible;
//     opacity: 1;
//     box-shadow: -1px 1px;
//     /* transition: visibility 0s, opacity 0.2s linear; */
//   `}
// `;

const XButton = styled.button`
  position: absolute;
  top: -0.7rem;
  left: -0.4rem;
  padding: 1rem;
  border-radius: 9999px;
  border: none;
  background-color: transparent;
  color: ${props => props.fontColor};
  cursor: pointer;
  z-index: 2;

  visibility: hidden;
  opacity: 0;
  ${props => props.showXButton == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
`;

export default Ticker;