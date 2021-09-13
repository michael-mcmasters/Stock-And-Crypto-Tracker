import React from 'react';

const DEBUG_USE_FAKE_PRICES = false;

const UseFetchTickers = () => {

  // Example URI: http://localhost:8080/stock/botz
  const fetchAPI = async (ticker) => {
    let response = await fetch(`http://localhost:8080/${ticker.type}/${ticker.tickerName}`);
    response = await response.json();
    return response;
  }

  const fetchRealPrices = async (tickersArrCopy) => {
    for (let i = 0; i < tickersArrCopy.length; i++) {
      try {
        let response = await fetchAPI(tickersArrCopy[i]);
        tickersArrCopy[i].currentPrice = response.currentPrice;
        tickersArrCopy[i].day.priceDifference = response.priceChanges.day.priceDifference;
        tickersArrCopy[i].day.percentage = response.priceChanges.day.percentage;
        tickersArrCopy[i].week.priceDifference = response.priceChanges.week.priceDifference;
        tickersArrCopy[i].week.percentage = response.priceChanges.week.percentage;
        tickersArrCopy[i].month.priceDifference = response.priceChanges.month.priceDifference;
        tickersArrCopy[i].month.percentage = response.priceChanges.month.percentage;
        tickersArrCopy[i].ytd.priceDifference = response.priceChanges.ytd.priceDifference;
        tickersArrCopy[i].ytd.percentage = response.priceChanges.ytd.percentage;
        tickersArrCopy[i].year.priceDifference = response.priceChanges.year.priceDifference;
        tickersArrCopy[i].year.percentage = response.priceChanges.year.percentage;
      } catch (exc) {
        //console.log(`There was an error handling ${tickersArrCopy[i].tickerName}`);
      }
    }
    return tickersArrCopy;
  }

  const generateFakePrices = async (tickersArrCopy) => {
    for (let i = 0; i < tickersArrCopy.length; i++) {
      const prevPrice = tickersArrCopy[i].currentPrice;
      tickersArrCopy[i].currentPrice = (Math.random() * 10).toFixed(6);
      tickersArrCopy[i].day.priceDifference = (tickersArrCopy[i].currentPrice - prevPrice).toFixed(2);    // priceDifference and percentage are not mathematically correct. These numbers are just for visualizing.
      tickersArrCopy[i].day.percentage = (Math.random() * 4).toFixed(2);
      tickersArrCopy[i].week.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArrCopy[i].week.percentage = (Math.random() * 5).toFixed(2);
      tickersArrCopy[i].month.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArrCopy[i].month.percentage = (Math.random() * 6).toFixed(2);
      tickersArrCopy[i].ytd.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArrCopy[i].ytd.percentage = (Math.random() * 7).toFixed(2);
      tickersArrCopy[i].year.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArrCopy[i].year.percentage = (Math.random() * 8).toFixed(2);
    }
    return tickersArrCopy;
  }

  const fetchTickers = async (tickersArr) => {
    let tickersArrCopy = [...tickersArr];
    if (DEBUG_USE_FAKE_PRICES) return await generateFakePrices(tickersArrCopy);
    else return await fetchRealPrices(tickersArrCopy);
  }

  const fetchAPISupportsTicker = (tickerName) => {

  }

  return [fetchTickers, fetchAPISupportsTicker];
};

export default UseFetchTickers;