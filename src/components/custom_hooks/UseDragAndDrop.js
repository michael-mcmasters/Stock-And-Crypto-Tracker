import React, { useState, useEffect } from 'react';

const useDragAndDrop = (initialItemsArr) => {

  const [itemsArr, setItemsArr] = useState(initialItemsArr.map(item => {
    return {
      ...item,
      beingDragged: false,
      hitboxDetectingTicker: false,
      swapped: false
    };
  }));

  const [hitboxDetectingIndex, setHitboxDetectingIndex] = useState(-1);


  // Returns a copy of the array with the two items swapped
  const swapItems = (firstIndex, secondIndex) => {
    const copyArr = [...itemsArr];
    if (hitboxDetectingIndex > -1) {
      const droppedItem = copyArr[firstIndex];

      copyArr[firstIndex] = copyArr[secondIndex];
      copyArr[secondIndex] = droppedItem;
      copyArr[firstIndex].swapped = true;
      copyArr[secondIndex].swapped = true;
    }
    return copyArr;
  }


  // Applies action to the item with the given index
  const handlers = {

    handleDragStart: (index) => {
      setItemsArr(itemsArr.map((item, i) => {
        if (i === index) {
          item.beingDragged = true;
        }
        item.swapped = false;
        return item;
      }))
    },

    handleDragEnd: (droppedTickerIndex) => {
      setHitboxDetectingIndex(-1);
      const copyArr = swapItems(droppedTickerIndex, hitboxDetectingIndex);
      copyArr.forEach((i) => {
        i.hitboxDetectingTicker = false;
        i.beingDragged = false;
      });
      setItemsArr(copyArr);
    },

    handleHitboxEnter: (event, index) => {
      event.preventDefault();
      setHitboxDetectingIndex(index);
      const copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = true;
      setItemsArr(copyArr);
    },

    handleHitboxLeave: (index) => {
      setHitboxDetectingIndex(-1);
      const copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = false;
      setItemsArr(copyArr);
    },
  }


  // Gets status of the item at the given index
  const getters = {

    getBeingDragged: (index) => {
      return itemsArr[index].beingDragged;
    },

    getHitboxDetectTicker: (index) => {
      return itemsArr[index].hitboxDetectingTicker;
    },

    getSwapped: (index) => {
      return itemsArr[index].swapped;
    },
  }


  return [itemsArr, setItemsArr, handlers, getters];
};

export default useDragAndDrop;