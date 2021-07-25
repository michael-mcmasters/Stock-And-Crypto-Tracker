import { useState, useEffect } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";
import HistoryOptionsGallery from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";

const DEBUG_USE_FAKE_PRICES = false;
const MAX_ALLOWED_TICKERS = 16;
const PRICE_UPDATE_DELAY = 15000; // 5000 is 5 seconds

function TickerGallery() {
  const [tickersArr, setTickersArr] = useState(getTickerObjects());
  const [selectedHistoryOption, setSelectedHistoryOption] = useState(HistoryOptions.DAY);
  const [response, setResponse] = useState([]);

  const handleClickHistoryOption = (historyOption) => {
    setSelectedHistoryOption(historyOption);
    update(historyOption);
    console.log(historyOption);
  }

  const update = (historyOption) => {
    let arr = [...tickersArr];
    for (let i = 0; i < arr.length; i++) {
      arr[i].currentPrice = response[i].currentPrice;
      arr[i].priceDifference = response[i][selectedHistoryOption]?.priceDifference;
      arr[i].percentage = response[i][selectedHistoryOption]?.percentage.toFixed(2);
    }
    setTickersArr(arr);
  }

  console.log("Re-render. selectedHistoryOption is: " + selectedHistoryOption);

  const updatePrices = async () => {
    let arr = [...tickersArr];
    // let response = [];
    if (DEBUG_USE_FAKE_PRICES) {
      for (let i = 0; i < arr.length; i++) {
        const prevPrice = tickersArr[i].currentPrice;
        arr[i].currentPrice = (Math.random() * 10).toFixed(6);
        arr[i].priceDifference = (arr[i].currentPrice - prevPrice).toFixed(2);
        arr[i].percentage = (Math.random() * 4).toFixed(2);
      }
    } else {
      console.log("updatePrices: selectedHistoryOption is: " + selectedHistoryOption);
      for (let i = 0; i < arr.length; i++) {
        // Example URI: http://localhost:8080/stock/botz
        let res = await fetch(`http://localhost:8080/${arr[i].type}/${arr[i].tickerName}`);
        res = await res.json();
        if (res.day == null) console.log(res);
        arr[i].currentPrice = res.currentPrice;
        arr[i].priceDifference = res[selectedHistoryOption]?.priceDifference;
        arr[i].percentage = res[selectedHistoryOption]?.percentage.toFixed(2);
      }
    }
    setResponse(arr);
    setTickersArr(arr);
  };

  const handleAddTicker = (tickerName, type) => {
    if (tickersArr.length >= MAX_ALLOWED_TICKERS) return;

    let arr = [...tickersArr];
    arr.push({ tickerName, type: type, currentPrice: 0, prevPrice: 0 });
    setTickersArr(arr);
  };

  useEffect(() => {
    updatePrices();

    const interval = setInterval(() => {
      updatePrices();
    }, PRICE_UPDATE_DELAY);
    return () => clearInterval(interval);
  }, [selectedHistoryOption]);

  return (
    <>
      <Container>
        <HistoryOptionsGallery handleClickHistoryOption={handleClickHistoryOption} />
        <GridContainer>
          {tickersArr.map((t, keyIndex) => (
            <Ticker
              key={keyIndex}
              tickerName={t.tickerName}
              type={t.type}
              price={t.currentPrice}
              priceDifference={t.priceDifference}
              percentage={t.percentage}
            />
          ))}
        </GridContainer>
        <AddTickerInputField handleAddTicker={handleAddTicker} />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: min-content;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, auto);

  @media (max-width: 850px) {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
`;

function getTickerObjects() {
  return [
    {
      tickerName: "TWTR",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "AAPL",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "BOTZ",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "AMZN",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "BTC",
      type: "crypto",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "ETH",
      type: "crypto",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "YOLO",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "GOOGL",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "TSLA",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    // {
    //   tickerName: "VTSAX",
    //   type: "stock",
    //   currentPrice: 0,
    //   priceDifference: 0,
    //   percentage: 0.0,
    // },
    {
      tickerName: "UBER",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "LYFT",
      type: "stock",
      currentPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
  ];
}

export default TickerGallery;
