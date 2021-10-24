import React, { useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from "styled-components";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";
import { isMobile } from 'react-device-detect';


const DELETED_ANIMATION_LENGTH = 300;


const Ticker3 = ({ tickerName, index, type, loading, price, priceDifference, percentage, handleDeleteTicker, beingDragged, hitboxDetectingDraggedItem, swapped }) => {
  
  const COLORS = useContext(ColorThemeContext);
  const [isHovering, setIsHovering] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);
  
  // Delays deletion while CSS animation plays.
  const handleClickDelete = () => {
    setTimeout(() => handleDeleteTicker(index), DELETED_ANIMATION_LENGTH);
    setBeingDeleted(true);
  }
  
  useEffect(() => {
    if (swapped) {
      setIsHovering(false);
    }
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
      onMouseEnter={() => !beingDragged && !swapped && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        showXButton={(isHovering || isMobile) && !loading && !beingDragged}
        onClick={handleClickDelete}
      >
        &#x2715;
      </DeleteButton>


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
  /* position: relative; */
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

const DeleteButton = styled.button`
  position: absolute;
  top: -0.7rem;
  left: -0.4rem;
  padding: 1rem;
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
`;

export default Ticker3;