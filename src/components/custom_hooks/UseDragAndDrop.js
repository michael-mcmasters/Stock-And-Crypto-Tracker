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

  const [drugOverIndex, setDrugOverIndex] = useState(-1);


  const swapItems = (firstIndex, secondIndex) => {
    const copyArr = [...itemsArr];
    if (drugOverIndex > -1) {
      const droppedItem = copyArr[firstIndex];

      copyArr[firstIndex] = copyArr[secondIndex];
      copyArr[secondIndex] = droppedItem;
      copyArr[firstIndex].swapped = true;
      copyArr[secondIndex].swapped = true;
    }
    return copyArr;
  }


  // Applies action to the item with the given index
  const actions = {

    handleDragStart: (index) => {
      let copyArr = [...itemsArr];
      copyArr.forEach(i => i.swapped = false);
      copyArr[index].beingDragged = true;
      setItemsArr(copyArr);
    },

    handleDragEnd: (droppedTickerIndex) => {
      const copyArr = swapItems(droppedTickerIndex, drugOverIndex);
      copyArr.forEach((i) => {
        i.hitboxDetectingTicker = false;
        i.beingDragged = false;
      });
      setItemsArr(copyArr);
      setDrugOverIndex(-1);
    },

    handleHitboxDetectTicker: (event, index) => {
      event.preventDefault();
      let copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = true;
      setItemsArr(copyArr);
      setDrugOverIndex(index);
    },

    handleHitboxUndetectTicker: (index) => {
      let copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = false;
      setItemsArr(copyArr);
      setDrugOverIndex(-1);
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


  return [itemsArr, setItemsArr, actions, getters];
};

export default useDragAndDrop;