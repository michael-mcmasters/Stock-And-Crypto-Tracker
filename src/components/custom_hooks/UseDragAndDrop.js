import { useState } from 'react';

const useDragAndDrop = (initialDragAndDropItems) => {

  const [dragAndDropItems, setDragAndDropItems] = useState(initialDragAndDropItems.map(item => {
    return {
      ...item,
      beingDragged: false,
      hitboxDetectingDraggedItem: false,
      swapped: false
    };
  }));


  const swapItems = (itemsCopy, firstIndex, secondIndex) => {
    const firstItem = itemsCopy[firstIndex];
    itemsCopy[firstIndex] = itemsCopy[secondIndex];
    itemsCopy[secondIndex] = firstItem;
    itemsCopy[firstIndex].swapped = true;
    itemsCopy[secondIndex].swapped = true;
    return itemsCopy;
  }


  // Applies action to the item with the given index
  const handlers = {

    handleDragStart: (draggedItemIndex) => {
      setDragAndDropItems(dragAndDropItems.map((item, ind) => {
        if (ind === draggedItemIndex) {
          item.beingDragged = true;
        }
        item.swapped = false;
        return item;
      }))
    },

    handleDragEnd: (draggedItemIndex) => {
      let itemsCopy = [...dragAndDropItems];
      const hitboxDetectingIndex = itemsCopy.findIndex(item => item.hitboxDetectingDraggedItem == true);
      if (hitboxDetectingIndex !== -1) {
        itemsCopy = swapItems(itemsCopy, draggedItemIndex, hitboxDetectingIndex);
      }
      itemsCopy.forEach((item) => {
        item.hitboxDetectingDraggedItem = false;
        item.beingDragged = false;
      });
      setDragAndDropItems(itemsCopy);
    },

    handleHitboxEnter: (event, detectorIndex) => {
      event.preventDefault();
      const itemsCopy = [...dragAndDropItems];
      itemsCopy[detectorIndex].hitboxDetectingDraggedItem = true;
      setDragAndDropItems(itemsCopy);
    },

    handleHitboxLeave: (detectorIndex) => {
      const itemsCopy = [...dragAndDropItems];
      itemsCopy[detectorIndex].hitboxDetectingDraggedItem = false;
      setDragAndDropItems(itemsCopy);
    },
  }


  // Gets status of the item at the given index
  const getters = {

    getBeingDragged: (index) => {
      return dragAndDropItems[index].beingDragged;
    },

    getHitboxDetectingDraggedItem: (index) => {
      return dragAndDropItems[index].hitboxDetectingDraggedItem;
    },

    getSwapped: (index) => {
      return dragAndDropItems[index].swapped;
    },
  }


  return [dragAndDropItems, setDragAndDropItems, handlers, getters];
};

export default useDragAndDrop;