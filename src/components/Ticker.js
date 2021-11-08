import React, { useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from "styled-components";
import { ColorThemeContext } from "./wrappers/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";
import { isMobile } from 'react-device-detect';


const BEING_DELETED_ANIMATION_LENGTH = 300;


const Ticker = ({ tickerName, index, type, loading, price, priceDifference, percentage, handleDeleteTicker,
  beingDragged, hitboxDetectingDraggedItem, swapped }) => {
  
  const COLORS = useContext(ColorThemeContext);
  const [cursorIsHovering, setCursorIsHovering] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);
  const [shares, setShares] = useState(1);
  
  
  
  // onMouseEnter will sometimes give false positives for a ticker that isn't under the cursor when swapping. This sets isHovering back to false.
  useEffect(() => {
    setTimeout(() => swapped && setCursorIsHovering(false), 40);
  }, [swapped])
  
  
  const handleClickDelete = () => {
    setTimeout(() => handleDeleteTicker(index), BEING_DELETED_ANIMATION_LENGTH);    // Wait to delete while CSS animation plays.
    setBeingDeleted(true);
  }
  const showHoverStyling = (cursorIsHovering || isMobile) && !loading && !beingDragged;
  
  
  let backgroundColor, fontColor;
  if (priceDifference <= 0) {
    backgroundColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    backgroundColor = COLORS.green;
    fontColor = COLORS.basicGreen;
  }
  
  const formatLengthOfPrice = (num) => {
    if (num >= 0.0099) {
      return num.toFixed(2);
    } else {
      return num.toFixed(6);
    }
  }
  let total = price * shares;
  price = formatLengthOfPrice(price);
  total = formatLengthOfPrice(total);
  
  const getPriceDifference = (priceDifference, percentage) => {
    if (priceDifference <= 0) {
      priceDifference = Math.abs(priceDifference);
      return <><Triangle>&#9660;</Triangle>{priceDifference} ({percentage}%)</>
    } else {
      return <><Triangle>&#9650;</Triangle>{priceDifference} ({percentage}%)</>
    }
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
        visible={showHoverStyling}
        onClick={handleClickDelete}
      >
        &#x2715;
      </DeleteButton>

    <TitleContainer>
      <Title>
        {tickerName}
      </Title>
      <PriceDiff>
        {getPriceDifference(priceDifference, percentage)}
      </PriceDiff>
    </TitleContainer>
      
      <FirstRow>
        <div>
          Price
        </div>
        <div>
          {"$" + price}
        </div>
      </FirstRow>
      
      <SecondRow>
        {/* {getPriceDifference(priceDifference, percentage)} */}
      </SecondRow>
      
      <ThirdRow>
        <div>
          Shares
        </div>
        <SharesButtonContainer>
          <SharesButton fontColor={fontColor} visible={showHoverStyling} onClick={() => setShares(prevShares => prevShares - 1)}>&#8722;</SharesButton>
          <SharesButton fontColor={fontColor} visible={showHoverStyling} onClick={() => setShares(prevShares => prevShares + 1)}>&#43;</SharesButton>
        </SharesButtonContainer>
        <Shares fontColor={fontColor} showHoverStyling={showHoverStyling} type="number" value={shares} onChange={(e) => setShares(Number(e.target.value))} />
      </ThirdRow>
      
      <FourthRow>
        <div>
          Total
        </div>
        <div>
          {"$" + total}
        </div>
      </FourthRow>
  
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
  padding: 0.5rem 0.5rem;
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
`;

const Title = styled.div`
  font-weight: bold;
`;

const PriceDiff = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* font-size: 0.65rem; */
  font-size: 0.8rem;
`;

const FirstRow = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;  
  align-items: center;
`;

const SecondRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.65rem;
`;

const ThirdRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FourthRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Triangle = styled.div`
  padding: 0rem;
  font-size: 0.55rem;
  margin-right: 0.2rem;
`;

const SharesButtonContainer = styled.div`
  margin-left: auto;
  margin-right: 0.2rem;
`;

const SharesButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.fontColor};
  color: ${props => props.fontColor};
  border-radius: 10px;
  width: 0.9rem;
  height: 0.9rem;
  margin: 0 0.15rem;
  padding: 0;
  
  visibility: hidden;
  opacity: 0;
  ${props => props.visible == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
`;

const Shares = styled.input`
  width: 35%;
  border: none;
  border-radius: 10px;
  text-align: right;
  color: ${props => props.fontColor};
  background-color: rgba(255, 255, 255, 0);
  
  ${props => props.showHoverStyling && css`
    color: black;  
    background-color: rgba(255, 255, 255, 0.3);
  `}
  
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`;


// const TickerName = styled.div`
//   font-weight: bold;
// `;

// const Price = styled.div`
//   margin-top: 0.5em;
// `;

// const PriceChange = styled.div`
//   margin-top: 0.2rem;
//   font-size: 0.9rem;
// `;

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
  ${props => props.visible == true && css`
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s linear;
  `}
  
  &:hover {
    background-color: #00000060;
  }
`;

export default Ticker;