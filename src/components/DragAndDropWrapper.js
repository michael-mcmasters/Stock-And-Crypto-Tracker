import React from 'react';
import styled, { css } from "styled-components";

const DragAndDropWrapper = ({children, dragAndDropHandlers, dragAndDropGetters}) => {
  
  const { setAllowDragAndDrop, handleDragStart, handleDragEnd, handleHitboxEnter, handleHitboxLeave } = dragAndDropHandlers;
  const { getAllowDragAndDrop, getBeingDragged, getHitboxDetectingDraggedItem, getSwapped } = dragAndDropGetters;
  
  const [dragging, setDragging] = React.useState(false);
  
  return (
    <>
      {React.Children.map(children, (child, index) => (
          <Container
            draggable={getAllowDragAndDrop()}
            onDragStart={() => {handleDragStart(index); setDragging(true);}}
            onDragEnd={() => {handleDragEnd(index); setDragging(false)}}
            hitboxDetectingDraggedItem={getHitboxDetectingDraggedItem(index)}
            beingDragged={getBeingDragged(index)}
          >
            
            <HitBox dragging={dragging} onDragOver={(event) => handleHitboxEnter(event, index)} onDragLeave={() => handleHitboxLeave(index)} />
            
            {React.cloneElement(child, {
              beingDragged: getBeingDragged(index),
              hitboxDetectingDraggedItem: getHitboxDetectingDraggedItem(index),
              swapped: getSwapped(index)
            })}
          </Container>
        ))}
    </>
  );
};


const Container = styled.div`
  position: relative;
  cursor: ${props => props.draggable ? "move" : ""};
  
  ${props => props.beingDragged && css`
    opacity: 0.3;
  `}
`;

// Determines where a ticker can be dragged to. Not used for appearance. Uncomment the border to view hitbox area. 
const HitBox = styled.div`
  /* border: 1px solid blue; */
  pointer-events: ${props => props.dragging ? "" : "none"};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export default DragAndDropWrapper;