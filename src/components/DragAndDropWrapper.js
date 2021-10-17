import React from 'react';

const DragAndDropWrapper = ({dragAndDropHandlers, dragAndDropGetters, render}) => {
  
  let tickers = render();
  
  const { setAllowDragAndDrop, handleDragStart, handleDragEnd, handleHitboxEnter, handleHitboxLeave } = dragAndDropHandlers;
  const { getAllowDragAndDrop, getBeingDragged, getHitboxDetectingDraggedItem, getSwapped } = dragAndDropGetters;
  

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
      {tickers[0]}
      {tickers[1]}
      {tickers[1]}
      {tickers[1]}
      {tickers[1]}
      {tickers[1]}
      {tickers[1]}
      
      {/* {tickers.map(t => {
        return t;
      })} */}
    </>
  );
};

export default DragAndDropWrapper;