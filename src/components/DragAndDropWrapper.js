import React, { useState } from 'react';
import styled, { css } from "styled-components";
import deepCopy from "./utils/DeepCopy";

const DragAndDropWrapper = ({ children, tickersArr, setTickersArr, allowDragAndDrop }) => {

  const [state, setState] = useState({
    dragging: false,
    indexBeingDragged: -1,
    indexDetectingDraggedItem: -1,
    indexesSwapped: []
  })
  

  const swapItems = (tickersArr, setTickersArr, [indexBeingDragged, itemBeingDraggedIndex]) => {
    const copy = deepCopy(tickersArr);
    const store = copy[itemBeingDraggedIndex];
    copy[itemBeingDraggedIndex] = copy[indexBeingDragged];
    copy[indexBeingDragged] = store;
    setTickersArr(copy);
  }

  const handleDragStart = (indexBeingDragged) => {
    setState({
      ...state,
      dragging: true,
      indexBeingDragged: indexBeingDragged,
      indexesSwapped: []
    })
  };

  const handleDragEnd = (indexBeingDragged) => {
    if (state.indexDetectingDraggedItem !== -1) {
      const indexesSwapped = [state.indexDetectingDraggedItem, indexBeingDragged];
      swapItems(tickersArr, setTickersArr, indexesSwapped);
      
      setState({
        ...state,
        dragging: false,
        indexBeingDragged: -1,
        indexDetectingDraggedItem: -1,
        indexesSwapped: indexesSwapped,
      })
      
      setTimeout(() => {
        setState({...state, indexesSwapped: []});
      }, 500);
    }
  };

  const handleHitboxEnter = (detectorIndex, event) => {
    event.preventDefault();
    setState({
      ...state,
      indexDetectingDraggedItem: detectorIndex
    })
  };

  const handleHitboxLeave = () => {
    setState({
      ...state,
      indexDetectingDraggedItem: -1
    })
  };
  

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Container
          draggable={allowDragAndDrop}
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => handleDragEnd(index)}
          beingDragged={index === state.indexBeingDragged}
        >

          <HitBox dragging={state.dragging} onDragOver={(event) => handleHitboxEnter(index, event)} onDragLeave={() => handleHitboxLeave()} />

          {React.cloneElement(child, {
            beingDragged: index === state.indexBeingDragged,
            hitboxDetectingDraggedItem: index === state.indexDetectingDraggedItem,
            swapped: state.indexesSwapped.includes(index)
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