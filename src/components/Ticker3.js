import React, { useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from "styled-components";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";
import { isMobile } from 'react-device-detect';


const DELETED_ANIMATION_LENGTH = 300;


const Ticker3 = ({ tickerName, index, type, loading, price, priceDifference, percentage, handleDeleteTicker,
  beingDragged, hitboxDetectingDraggedItem, swapped }) => {
  
  const COLORS = useContext(ColorThemeContext);
  const [cursorIsHovering, setCursorIsHovering] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);
  
  const handleClickDelete = () => {
    setTimeout(() => handleDeleteTicker(index), DELETED_ANIMATION_LENGTH);    // Wait to delete while CSS animation plays.
    setBeingDeleted(true);
  }
  
  // onMouseEnter will sometimes give a false positive for a ticker that isn't under the cursor when swapping. This sets isHovering back to false.
  useEffect(() => {
    setTimeout(() => swapped && setCursorIsHovering(false), 20);
  }, [swapped])
  
  let backgroundColor, fontColor;
  if (priceDifference <= 0) {
    backgroundColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    backgroundColor = COLORS.green;
    fontColor = COLORS.basicGreen;
    priceDifference = "+" + priceDifference;
  }
  
  return (
    <Container
      onMouseEnter={() => setCursorIsHovering(true)}
      onMouseLeave={() => setCursorIsHovering(false)}
      colors={COLORS}
      fontColor={fontColor}
      bgColor={backgroundColor}
      beingDeleted={beingDeleted}
      beingDragged={beingDragged}
      hitboxDetectingDraggedItem={hitboxDetectingDraggedItem}
      swapped={swapped}
    >
      
      <DeleteButton
        colors={COLORS}
        fontColor={fontColor}
        showXButton={(cursorIsHovering || isMobile) && !loading && !beingDragged}
        onClick={handleClickDelete}
      >
        &#x2715;
      </DeleteButton>

      <TickerName>{tickerName}</TickerName>
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
  
  ${props => props.beingDeleted && css`
    animation-name: ${DeletedAnimation};
    animation-duration: 0.3s;
  `}
  
  ${props => props.hitboxDetectingDraggedItem && css`
    border: 2px solid yellow;
  `}
  
  ${props => props.swapped == true && css`
    animation-name: ${FlashYellowAnimation};
    animation-duration: 0.8s;
  `}
`;

const TickerName = styled.div`
  font-weight: bold;
`;

const Price = styled.div`
  margin-top: 0.5em;
`;

const PriceChange = styled.div`
  margin-top: 0.2rem;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  border-radius: 9999px;
  border: none;
  background-color: transparent;
  color: ${props => props.fontColor};
  cursor: pointer;

  visibility: hidden;
  opacity: 0;
  ${props => props.showXButton == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
  
  &:hover {
    background-color: #00000060;
  }
`;

export default Ticker3;