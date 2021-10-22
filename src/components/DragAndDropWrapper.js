import React from 'react';
import styled, { css, keyframes } from "styled-components";

const DragAndDropWrapper = ({children, dragAndDropHandlers, dragAndDropGetters, margin}) => {
  
  const { setAllowDragAndDrop, handleDragStart, handleDragEnd, handleHitboxEnter, handleHitboxLeave } = dragAndDropHandlers;
  const { getAllowDragAndDrop, getBeingDragged, getHitboxDetectingDraggedItem, getSwapped } = dragAndDropGetters;
  
  return (
    <>
      {React.Children.map(children, (child, index) => (
          
          <Container>
            {React.cloneElement(child, {
              dragAndDropHandlers: dragAndDropHandlers,
              allowDragAndDrop: dragAndDropGetters.getAllowDragAndDrop(),
              beingDragged: dragAndDropGetters.getBeingDragged(index),
              hitboxDetectingDraggedItem: dragAndDropGetters.getHitboxDetectingDraggedItem(index),
              swapped: dragAndDropGetters.getSwapped(index)
            })}
          </Container>
        )
      
      )}
    </>
  );
};

const FlashYellowAnimation = keyframes`
  50% { background-color: yellow; }
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