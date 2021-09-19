import { useEffect, useState } from 'react';

const useDragAndDrop = (initialDragAndDropItems, initialAllowDragAndDrop = true) => {

  const [dragAndDropItems, setDragAndDropItems] = useState(initialDragAndDropItems);

  const [allowDragAndDrop, setAllowDragAndDrop] = useState(false);
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


  const handlers = {

    setAllowDragAndDrop: setAllowDragAndDrop,

    // The following functions applies actions to the item at the given index

    handleDragStart: (draggedItemIndex) => {
      setIndexBeingDragged(draggedItemIndex);
      setIndexSwapped([]);
    },

    handleDragEnd: (draggedItemIndex) => {
      if (indexDetectingDraggedItem !== -1) {
        setIndexDetectingDraggedItem(-1);
        setIndexBeingDragged(-1);
        const itemsCopy = JSON.parse(JSON.stringify(dragAndDropItems));
        swapItems(itemsCopy, draggedItemIndex, indexDetectingDraggedItem);
      }
    },

    handleHitboxEnter: (event, detectorIndex) => {
      event.preventDefault();
      setIndexDetectingDraggedItem(detectorIndex);
    },

    handleHitboxLeave: (detectorIndex) => {
      setIndexDetectingDraggedItem(-1);
    },
  }


  const getters = {

    getAllowDragAndDrop: () => {
      return allowDragAndDrop;
    },

    // The following functions get the status of the item at the given index

    getBeingDragged: (index) => {
      return indexBeingDragged === index;
    },

    getHitboxDetectingDraggedItem: (index) => {
      return indexDetectingDraggedItem === index;
    },

    getSwapped: (index) => {
      return indexSwapped.includes(index);
    },
  }


  return [dragAndDropItems, setDragAndDropItems, handlers, getters];
};

export default useDragAndDrop;