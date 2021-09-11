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

  const [hitboxDetectingIndex, setHitboxDetectingIndex] = useState(-1);


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
      setHitboxDetectingIndex(-1);
      let itemsCopy = [...dragAndDropItems];
      if (hitboxDetectingIndex !== -1) {
        itemsCopy = swapItems(itemsCopy, draggedItemIndex, hitboxDetectingIndex);
      }
      itemsCopy.forEach((item) => {
        item.hitboxDetectingDraggedItem = false;
        item.beingDragged = false;
      });
      setDragAndDropItems(itemsCopy);
    },

    handleHitboxEnter: (event, index) => {
      event.preventDefault();
      setHitboxDetectingIndex(index);
      const itemsCopy = [...dragAndDropItems];
      itemsCopy[index].hitboxDetectingDraggedItem = true;
      setDragAndDropItems(itemsCopy);
    },

    handleHitboxLeave: (index) => {
      setHitboxDetectingIndex(-1);
      const itemsCopy = [...dragAndDropItems];
      itemsCopy[index].hitboxDetectingDraggedItem = false;
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