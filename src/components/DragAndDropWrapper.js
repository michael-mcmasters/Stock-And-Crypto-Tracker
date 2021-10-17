import React from 'react';
import styled, { css, keyframes } from "styled-components";

const DragAndDropWrapper = ({dragAndDropHandlers, dragAndDropGetters, render}) => {
  
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
      {tickers.map((ticker, index) => (
        <>
          <Container
            draggable={getAllowDragAndDrop()}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={() => handleDragEnd(index)}
            hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem(index)}
          >
          <HitBox onDragOver={(event) => handleHitboxEnter(event, index)} onDragLeave={() => handleHitboxLeave(index)} />
          <DropIndicator hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem(index)} />
            {ticker}
          </Container>
          
        </>
      ))}
    </>
  );
};

const FlashYellowAnimation = keyframes`
  50% { background-color: yellow; }
`;

const Container = styled.div`
  position: relative;
  border: 2px solid ${(props) => props.fontColor};
  padding: 0;
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
const HitBox = styled.div`
  border: 1px solid blue;
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

export default DragAndDropWrapper;