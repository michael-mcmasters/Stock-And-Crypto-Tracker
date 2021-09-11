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

  const [tickerDrugOverIndex, setTickerDrugOverIndex] = useState(-1);


  // Edge case fix to make sure items don't have beingDragged styling when user drops them.
  useEffect(() => {
    const handleMouseUp = () => {
      let copyArr = [...itemsArr];
      copyArr.forEach(i => i.beingDragged = false);
      setItemsArr(copyArr);
    }
    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  });

  const swapItems = (droppedTickerIndex) => {
    const copyArr = [...itemsArr];
    copyArr[droppedTickerIndex].beingDragged = false;

    const tickerDrugOver = copyArr[tickerDrugOverIndex];
    const droppedTicker = copyArr[droppedTickerIndex];
    copyArr[tickerDrugOverIndex] = droppedTicker;
    copyArr[droppedTickerIndex] = tickerDrugOver;
    copyArr[tickerDrugOverIndex].swapped = true;
    copyArr[droppedTickerIndex].swapped = true;

    setItemsArr(copyArr);
    setTickerDrugOverIndex(-1);
  }


  // Applies action to the item with the given index
  const actions = {

    handleDragStart: (index) => {
      let copyArr = [...itemsArr];
      copyArr[index].beingDragged = true;
      copyArr.forEach(i => i.swapped = false);
      setItemsArr(copyArr);
    },

    handleDragEnd: (droppedTickerIndex) => {
      swapItems(droppedTickerIndex);
    },

    handleHitboxDetectTicker: (index) => {
      let copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = true;
      setItemsArr(copyArr);
      setTickerDrugOverIndex(index);
    },

    handleHitboxUndetectTicker: (index) => {
      let copyArr = [...itemsArr];
      copyArr[index].hitboxDetectingTicker = false;
      setItemsArr(copyArr);
      setTickerDrugOverIndex(index);
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