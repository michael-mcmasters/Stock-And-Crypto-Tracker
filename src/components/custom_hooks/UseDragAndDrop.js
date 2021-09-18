import { useEffect, useState } from 'react';

const useDragAndDrop = (initialDragAndDropItems, initialAllowDragAndDrop = true) => {

  const [allowDragAndDrop, setAllowDragAndDrop] = useState(false);
  const [dragAndDropItems, setDragAndDropItems] = useState(initialDragAndDropItems.map(item => {
    return {
      ...item,
      beingDragged: false,
      hitboxDetectingDraggedItem: false,
      swapped: false
    };
  }));


  // Overrides set function to make sure objects have additional properties that this hook added.
  const setDragAndDropItemsOverride = (newDragAndDropItems) => {
    for (let i = 0; i < dragAndDropItems.length; i++) {
      newDragAndDropItems[i].beingDragged = dragAndDropItems[i].beingDragged;
      newDragAndDropItems[i].hitboxDetectingDraggedItem = dragAndDropItems[i].hitboxDetectingDraggedItem;
      newDragAndDropItems[i].swapped = dragAndDropItems[i].swapped;
    }
    setDragAndDropItems(newDragAndDropItems);
  }


  const swapItems = (itemsCopy, firstIndex, secondIndex) => {
    const firstItem = itemsCopy[firstIndex];
    itemsCopy[firstIndex] = itemsCopy[secondIndex];
    itemsCopy[secondIndex] = firstItem;
    itemsCopy[firstIndex].swapped = true;
    itemsCopy[secondIndex].swapped = true;
    return itemsCopy;
  }


  const handlers = {

    setAllowDragAndDrop: setAllowDragAndDrop,

    // The following functions applies actions to the item at the given index

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


  const getters = {

    getAllowDragAndDrop: () => {
      // console.log("value is " + allowDragAndDrop)
      return allowDragAndDrop;
    },

    // The following functions get the status of the item at the given index

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


  return [dragAndDropItems, setDragAndDropItemsOverride, handlers, getters];
};

export default useDragAndDrop;