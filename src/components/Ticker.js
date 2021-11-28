import React, { useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from "styled-components";
import { ColorThemeContext } from "./wrappers/ColorThemeContext";
import ClipLoader from "react-spinners/ClipLoader";
import TickerButton from "../TickerButton"
import TickerSharesInputField from './TickerSharesInputField';
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
  
  
  const handleUpdateShares = (event) => {
    setShares(Number(event.target.value))
  }
  
  
  let backgroundColor, fontColor;
  if (priceDifference <= 0) {
    backgroundColor = COLORS.brightRed;
    fontColor = COLORS.darkRed;
  } else {
    backgroundColor = COLORS.green;
    fontColor = COLORS.basicGreen;
  }
  
  const formatLengthOfPrice = (num) => {
    if (num === 0 || num >= 0.0099) {
      return num.toFixed(2);
    } else {
      return num.toFixed(6);
    }
  }
  let total = price * shares;
  price = formatLengthOfPrice(price);
  total = formatLengthOfPrice(total);
  
  const getPriceChange = (priceDifference, percentage) => {
    if (priceDifference <= 0) {
      priceDifference = Math.abs(priceDifference);
      return <> <Triangle>&#9660;</Triangle>{priceDifference} ({percentage}%) </>
    } else {
      return <> <Triangle>&#9650;</Triangle>{priceDifference} ({percentage}%) </>
    }
  }
  
  const innerContent = (
    <>
      <TitleRow>
        <Title>
          {tickerName}
        </Title>
        <PriceChange>
          {getPriceChange(priceDifference, percentage)}
        </PriceChange>
      </TitleRow>

      <PriceRow>
        <div>
          Price
        </div>
        <div>
          {"$" + price}
        </div>
      </PriceRow>

      <SharesRow>
        <div>
          Shares
        </div>
        <SharesButtonContainer>
          <TickerButton
            visible={showHoverStyling}
            fontColor={fontColor}
            innerText={<span>&#8722;</span>}
            handleOnClick={() => (shares > 0) && setShares(prevShares => prevShares - 1)}
          />
          
          <TickerButton
            visible={showHoverStyling}
            fontColor={fontColor}
            innerText={<span>&#43;</span>}
            handleOnClick={() => setShares(prevShares => prevShares + 1)}
          />
        </SharesButtonContainer>
        <TickerSharesInputField
          visible={showHoverStyling}
          fontColor={fontColor}
          shares={shares}
          handleUpdateShares={handleUpdateShares}
        />
      </SharesRow>

      <TotalRow>
        <div>
          Total
        </div>
        <div>
          {"$" + total}
        </div>
      </TotalRow>
    </>
  )
  
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
      
      <DeleteButtonContainer>
        <TickerButton 
          visible={showHoverStyling}
          fontColor={fontColor}
          innerText={<span>&#x2715;</span>}
          handleOnClick={handleClickDelete}
        />
      </DeleteButtonContainer>
      
      {loading ? <ClipLoader /> : innerContent}
  
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
  padding: 1rem;
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

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0.13rem;
  right: 0.13rem;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.fontColor};
  padding-bottom: 0.5rem;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Triangle = styled.div`
  padding: 0rem;
  font-size: 0.55rem;
  margin-right: 0.2rem;
`;

const PriceChange = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
`;

const PriceRow = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;  
  align-items: center;
`;

const SharesRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SharesButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Ticker;