import React from 'react';


const DEBUG_USE_FAKE_PRICES = false;


const UseTickersAPI = () => {

  const generateFakePrices = async (tickersArr) => {
    for (let i = 0; i < tickersArr.length; i++) {
      const prevPrice = tickersArr[i].currentPrice;
      tickersArr[i].currentPrice = (Math.random() * 10).toFixed(6);
      tickersArr[i].priceChanges.day.priceDifference = (tickersArr[i].currentPrice - prevPrice).toFixed(2);    // priceDifference and percentage are not mathematically correct. These numbers are just for visualizing.
      tickersArr[i].priceChanges.day.percentage = (Math.random() * 4).toFixed(2);
      tickersArr[i].priceChanges.week.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArr[i].priceChanges.week.percentage = (Math.random() * 5).toFixed(2);
      tickersArr[i].priceChanges.month.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArr[i].priceChanges.month.percentage = (Math.random() * 6).toFixed(2);
      tickersArr[i].priceChanges.ytd.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArr[i].priceChanges.ytd.percentage = (Math.random() * 7).toFixed(2);
      tickersArr[i].priceChanges.year.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
      tickersArr[i].priceChanges.year.percentage = (Math.random() * 8).toFixed(2);
    }
    return tickersArr;
  }

  const fetchPrices = async (tickersArr) => {
    if (DEBUG_USE_FAKE_PRICES)
      return await generateFakePrices(tickersArr);

    for (let i = 0; i < tickersArr.length; i++) {
      try {
        let response = await fetch(`http://localhost:8080/${tickersArr[i].type}/${tickersArr[i].tickerName}`);    // Example URI: http://localhost:8080/stock/botz
        response = await response.json();

        tickersArr[i].currentPrice = response.currentPrice;
        tickersArr[i].priceChanges.day.priceDifference = response.priceChanges.day.priceDifference;
        tickersArr[i].priceChanges.day.percentage = response.priceChanges.day.percentage;
        tickersArr[i].priceChanges.week.priceDifference = response.priceChanges.week.priceDifference;
        tickersArr[i].priceChanges.week.percentage = response.priceChanges.week.percentage;
        tickersArr[i].priceChanges.month.priceDifference = response.priceChanges.month.priceDifference;
        tickersArr[i].priceChanges.month.percentage = response.priceChanges.month.percentage;
        tickersArr[i].priceChanges.ytd.priceDifference = response.priceChanges.ytd.priceDifference;
        tickersArr[i].priceChanges.ytd.percentage = response.priceChanges.ytd.percentage;
        tickersArr[i].priceChanges.year.priceDifference = response.priceChanges.year.priceDifference;
        tickersArr[i].priceChanges.year.percentage = response.priceChanges.year.percentage;
      } catch (exc) {
        console.log(`There was an error handling ${tickersArr[i].tickerName}`);
      }
    }
    return tickersArr;
  }

  /**
   * 
   * @param {String} tickerType "stock" or "crypto".
   * @param {String} tickerName The abbreviation, such as TWTR or BBRY.
   * @returns 
   */
  const fetchAPISupportsTicker = async (tickerType, tickerName) => {
    let response = await fetch(`http://localhost:8080/${tickerType}/${tickerName}`);
    response = await response.json();
    return response;
  }

  return [fetchPrices, fetchAPISupportsTicker];
};

export default UseTickersAPI;