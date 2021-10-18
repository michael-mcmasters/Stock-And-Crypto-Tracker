import React, { useState, useContext } from 'react';
import styled, { css, keyframes } from "styled-components";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";
import { isMobile } from 'react-device-detect';

const Ticker2 = ({ tickerName, index, type, loading, price, priceDifference, percentage, handleClickDelete }) => {
  const COLORS = useContext(ColorThemeContext);
  
  const [showDeleteButton, setShowDeleteButton] = useState(isMobile ? true : false);
  const [beingDeleted, setBeingDeleted] = useState(false);

  
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
      colors={COLORS}
      fontColor={fontColor}
      bgColor={bgColor}
      beingDeleted={beingDeleted}
    >

      {/* <DeleteButton
        colors={COLORS}
        fontColor={fontColor}
        showXButton={showDeleteButton}
        onClick={handleClickDelete}
      >
        &#x2715;
      </DeleteButton> */}


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
  /* margin: 1em 1em; */
  padding: 1em 0;
  border: 2px solid ${(props) => props.fontColor};
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
  z-index: 2;

  visibility: hidden;
  opacity: 0;
  ${props => props.showXButton == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
`;

export default Ticker2;