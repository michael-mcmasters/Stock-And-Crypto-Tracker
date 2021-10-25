import React, { useState } from 'react';
import styled, { css } from "styled-components";
import deepCopy from "../utils/DeepCopy";

const DragAndDropWrapper = ({ children, dragAndDropItems, setDragAndDropItems, allowDragAndDrop }) => {

  const [state, setState] = useState({
    dragging: false,
    indexBeingDragged: -1,
    indexDetectingDraggedItem: -1,
    indexesSwapped: []
  })
  
  const swapItems = ([indexBeingDragged, indexDetectingDraggedItem]) => {
    const copy = deepCopy(dragAndDropItems);
    const store = copy[indexBeingDragged];
    copy[indexBeingDragged] = copy[indexDetectingDraggedItem];
    copy[indexDetectingDraggedItem] = store;
    setDragAndDropItems(copy);
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
    if (state.indexDetectingDraggedItem === -1) {
      setState({
        ...state,
        dragging: false,
        indexBeingDragged: -1,
        indexDetectingDraggedItem: -1,
        indexesSwapped: []
      })
      return;
    }
    
    const indexesSwapped = [indexBeingDragged, state.indexDetectingDraggedItem];
    swapItems(indexesSwapped);
    
    setState({
      ...state,
      dragging: false,
      indexBeingDragged: -1,
      indexDetectingDraggedItem: -1,
      indexesSwapped: indexesSwapped,
    })
    
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        indexesSwapped: []
      }));
    }, 500);
  }

  const handleDropAreaEnter = (detectorIndex, event) => {
    event.preventDefault();
    setState({
      ...state,
      indexDetectingDraggedItem: detectorIndex
    })
  };

  const handleDropAreaLeave = () => {
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

          <DropArea
            dragging={state.dragging}
            onDragOver={(event) => handleDropAreaEnter(index, event)}
            onDragLeave={() => handleDropAreaLeave()}
          />

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
const DropArea = styled.div`
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