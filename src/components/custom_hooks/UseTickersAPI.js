const DEBUG_USE_FAKE_PRICES = true;

const UseTickersAPI = () => {

  const fetchActualPrices = async (ticker) => {
    let response = await fetch(`http://localhost:8080/${ticker.type}/${ticker.tickerName}`);    // Example URI: http://localhost:8080/stock/botz
    response = await response.json();

    ticker.currentPrice = response.currentPrice;
    ticker.priceChanges.day.priceDifference = response.priceChanges.day.priceDifference;
    ticker.priceChanges.day.percentage = response.priceChanges.day.percentage;
    ticker.priceChanges.week.priceDifference = response.priceChanges.week.priceDifference;
    ticker.priceChanges.week.percentage = response.priceChanges.week.percentage;
    ticker.priceChanges.month.priceDifference = response.priceChanges.month.priceDifference;
    ticker.priceChanges.month.percentage = response.priceChanges.month.percentage;
    ticker.priceChanges.ytd.priceDifference = response.priceChanges.ytd.priceDifference;
    ticker.priceChanges.ytd.percentage = response.priceChanges.ytd.percentage;
    ticker.priceChanges.year.priceDifference = response.priceChanges.year.priceDifference;
    ticker.priceChanges.year.percentage = response.priceChanges.year.percentage;
    return ticker;
  }

  const generateFakePrice = async (ticker) => {
    const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 3500));
    await randomDelay();

    /* Uncomment next line to simulate a failed fetch */
    if (ticker.tickerName === "ONE" || ticker.tickerName === "TWO" || ticker.tickerName === "THREE") throw "Failed to fetch ticker.tickerName"

    const prevPrice = ticker.currentPrice;
    ticker.currentPrice = (Math.random() * 10).toFixed(6);
    ticker.priceChanges.day.priceDifference = (ticker.currentPrice - prevPrice).toFixed(2);    // priceDifference and percentage are not mathematically correct. These numbers are just for visualizing.
    ticker.priceChanges.day.percentage = (Math.random() * 4).toFixed(2);
    ticker.priceChanges.week.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
    ticker.priceChanges.week.percentage = (Math.random() * 5).toFixed(2);
    ticker.priceChanges.month.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
    ticker.priceChanges.month.percentage = (Math.random() * 6).toFixed(2);
    ticker.priceChanges.ytd.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
    ticker.priceChanges.ytd.percentage = (Math.random() * 7).toFixed(2);
    ticker.priceChanges.year.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
    ticker.priceChanges.year.percentage = (Math.random() * 8).toFixed(2);
    return ticker;
  }

  const fetchPrice = async (ticker) => {
    if (DEBUG_USE_FAKE_PRICES)
      return await generateFakePrice(ticker);
    else
      return await fetchActualPrices(ticker);
  }

  return fetchPrice;
};

export default UseTickersAPI;
