import React, { useState, useRef } from 'react';
import styled, { css } from "styled-components";

const DragAndDropWrapper = ({ children, tickersArr, setTickersArr, allowDragAndDrop }) => {

  const [dragging, setDragging] = useState(false);

  const [dragAndDropItems, setDragAndDropItems] = useState(tickersArr);
  const [indexBeingDragged, setIndexBeingDragged] = useState(-1);
  const [indexDetectingDraggedItem, setIndexDetectingDraggedItem] = useState(-1);
  const [indexSwapped, setIndexSwapped] = useState([]);

  const swapItems = (itemsCopy, firstIndex, secondIndex) => {
    const firstItem = itemsCopy[firstIndex];
    itemsCopy[firstIndex] = itemsCopy[secondIndex];
    itemsCopy[secondIndex] = firstItem;
    setIndexSwapped([firstIndex, secondIndex]);
    setDragAndDropItems(itemsCopy);
    return itemsCopy;
  }



  const handleDragStart = (draggedItemIndex) => {
    setIndexBeingDragged(draggedItemIndex);
    setIndexSwapped([]);
  };

  const handleDragEnd = (draggedItemIndex) => {
    if (indexDetectingDraggedItem !== -1) {
      setIndexDetectingDraggedItem(-1);
      setIndexBeingDragged(-1);
      const itemsCopy = JSON.parse(JSON.stringify(dragAndDropItems));
      swapItems(itemsCopy, draggedItemIndex, indexDetectingDraggedItem);
      setTimeout(() => setIndexSwapped([]), 500);
    }
  };

  const handleHitboxEnter = (event, detectorIndex) => {
    event.preventDefault();
    setIndexDetectingDraggedItem(detectorIndex);
  };

  const handleHitboxLeave = (detectorIndex) => {
    setIndexDetectingDraggedItem(-1);
  };


  const getAllowDragAndDrop = () => {
    return allowDragAndDrop;
  };

  // The following functions get the status of the item at the given index

  const getBeingDragged = (index) => {
    return indexBeingDragged === index;
  };

  const getHitboxDetectingDraggedItem = (index) => {
    return indexDetectingDraggedItem === index;
  };

  const getSwapped = (index) => {
    return indexSwapped.includes(index);
  };

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Container
          draggable={getAllowDragAndDrop()}
          onDragStart={() => { handleDragStart(index); setDragging(true); }}
          onDragEnd={() => { handleDragEnd(index); setDragging(false) }}
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