import React, { useState, useEffect } from 'react';

const useDragAndDrop = (initialItemsArr) => {
  const [itemsArr, setItemsArr] = useState(initialItemsArr.map(i => {
    return {
      ...i,
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

  const handleDragStart = (index) => {
    let copyArr = [...itemsArr];
    copyArr[index].beingDragged = true;
    copyArr.forEach(i => i.swapped = false);
    setItemsArr(copyArr);
  }

  const handleDragEnd = (index) => {
    swap(index);
  }

  const handleHitboxDetectTicker = (index) => {
    let copyArr = [...itemsArr];
    copyArr[index].hitboxDetectingTicker = true;
    setItemsArr(copyArr);
    setTickerDrugOverIndex(index);
  }

  const handleHitboxUndetectTicker = (index) => {
    let copyArr = [...itemsArr];
    copyArr[index].hitboxDetectingTicker = false;
    setItemsArr(copyArr);
    setTickerDrugOverIndex(index);
  }

  const swap = (droppedTickerIndex) => {
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



  // *** Getters ***

  const getBeingDragged = (index) => {
    return itemsArr[index].beingDragged;
    return false;
  }

  const getHitboxDetectTicker = (index) => {
    return itemsArr[index].hitboxDetectingTicker;
    return false;
  }

  const getSwapped = (index) => {
    return itemsArr[index].swapped;
    return false;
  }




  const dragAndDropFunctions = {
    handleDragStart,
    handleDragEnd,
    handleHitboxDetectTicker,
    handleHitboxUndetectTicker,
    setTickerDrugOverIndex,
    swap,
    getBeingDragged,
    getHitboxDetectTicker,
    getSwapped
  };
  return [itemsArr, setItemsArr, dragAndDropFunctions];
};

export default useDragAndDrop;