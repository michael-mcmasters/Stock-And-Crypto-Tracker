import React from 'react';
import styled, { css, keyframes } from "styled-components";

const DragAndDropWrapper = ({dragAndDropHandlers, dragAndDropGetters, margin, render}) => {
  
  let tickers = render();
  
  const { setAllowDragAndDrop, handleDragStart, handleDragEnd, handleHitboxEnter, handleHitboxLeave } = dragAndDropHandlers;
  const { getAllowDragAndDrop, getBeingDragged, getHitboxDetectingDraggedItem, getSwapped } = dragAndDropGetters;
  
  // let elements = [];
  // for (let i = 0; i < tickers.length; i++) {
  //   elements.push(<Container>tickers[0]</Container>)
  // }

  return (
    <>
      {/* <div
        draggable={allowDragAndDrop}
        onDragStart={() => { handleDragStart(index); }}
        onDragEnd={() => handleDragEnd(index)}
        hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem()}
      >
      {tickers}
      </div> */}
      
      {/* ToDo: Map over each element and wrap them with a draggable container that calls the above functions,
          gives them HitBox element, DropIndicator, etc. Tickers2 should only show the view. */}
      
      {/* Hitbox is used to detect other tickers being dragged over this ticker */ }
      {/* {tickers.map((ticker, index) => (
        <>
          <Container
            margin={margin}
            draggable={getAllowDragAndDrop()}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={() => handleDragEnd(index)}
            hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem(index)}
            onDragOver={(event) => handleHitboxEnter(event, index)}
            onDragLeave={() => handleHitboxLeave(index)}
          >
            {ticker}
          </Container>
        </>
      ))} */}
      
      {tickers.map((ticker, index) => (
        <>
          <HitBoxContainer
            margin={margin}
            draggable={getAllowDragAndDrop()}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={() => handleDragEnd(index)}
            onDragOver={(event) => handleHitboxEnter(event, index)}
            // onDragLeave={() => handleHitboxLeave(index)}
            >
            <RegContainer
              hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem(index)}
              swapped={getSwapped(index)}
            >
              {ticker}
            </RegContainer>
          </HitBoxContainer>
        </>
      ))}
    </>
  );
};

const FlashYellowAnimation = keyframes`
  50% { background-color: yellow; }
`;

const HitBoxContainer = styled.div`
  position: relative;
  padding: ${props => props.margin};
`;


const RegContainer = styled.div`
  /* background-color: red; */
  border: 2px solid transparent;
  
  ${props => props.hitboxDetectingDraggedItem && css`
    border-radius: 10px;
    border: 2px solid yellow;
  `}
    
  ${props => props.swapped == true && css`
    animation-name: ${FlashYellowAnimation};
    animation-duration: 0.8s;
  `}
`;

const Swapper = styled.div`
  border: 1px solid red;
  ${props => props.swapped == true && css`
    animation-name: ${FlashYellowAnimation};
    animation-duration: 0.8s;
  `}
`;








const Container = styled.div`
  /* margin: ${props => props.margin}; */
  padding: ${props => props.margin};
  position: relative;
  /* padding: 0; */
  border: 2px solid transparent;
  /* border: 2px solid black; */
  border-radius: 10px;
  cursor: ${props => props.draggable ? "move" : ""};

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
// const Hitbox = styled.div`
//   border: 1px solid blue;
//   position: absolute;
//   width: 12em;
//   height: 8em;
//   /* bottom: -1em; */
//   /* left: -1.3em; */
//   bottom: -1em;
//   left: -1em;
//   z-index: 1;
// `;

const Hitbox = styled.div`
  border: 1px solid blue;
  position: absolute;
  padding: 4rem 6rem;
  /* padding: max-content; */
  /* width: max-content; */
  /* width: 12em;
  height: 8em; */
  /* bottom: -1em; */
  /* left: -1.3em; */
  /* bottom: -1em;
  left: -1em; */
  z-index: 1;
`;

const DropIndicator = styled.div`
  position: absolute;
  height: 4em;
  left: -1.15em;
  border-left: ${props => props.hitboxDetectingDraggedItem ? "4px solid yellow" : ""};
`;

export default DragAndDropWrapper;