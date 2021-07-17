import { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";

const MAX_ALLOWED_TICKERS = 16;
const PRICE_UPDATE_DELAY = 5000;    // 5 seconds
// const PRICE_UPDATE_DELAY = 100000;
const DEBUG_USE_FAKE_PRICES = false;


function TickerGallery() {

  const colors = useContext(ColorThemeContext);
  const [tickersArr, setTickersArr] = useState(getTickerObjects());

  const updatePrices = () => {
    if (DEBUG_USE_FAKE_PRICES) {
      let arr = [...tickersArr];
      for (let i = 0; i < arr.length; i++) {
        arr[i].prevPrice = tickersArr[i].currentPrice;
        arr[i].currentPrice = (Math.random() * 10).toFixed(6);
      }
      setTickersArr(arr);

    } else {
      let arr = [...tickersArr];
      for (let i = 0; i < arr.length; i++) {
        // Example URI: http://localhost:8080/stock/botz
        fetch(`http://localhost:8080/${arr[i].type}/${arr[i].tickerName}`)
          .then(res => res.json())
          .then(res => {
            if (res.day == null)
              console.log(res);
            arr[i].prevPrice = tickersArr[i].currentPrice;
            arr[i].currentPrice = res.currentPrice;
            arr[i].day.priceDifference = res.day?.priceDifference;
            arr[i].day.percentage = res.day?.percentage;
          });
      }
      setTickersArr(arr);
    }
  }

  const getTickerFontAndBGColors = (price, prevPrice) => {
    if (price > prevPrice) {
      return [colors.green, colors.basicGreen];
    }
    return [colors.brightRed, colors.darkRed];
  }

  const handleAddTicker = (tickerName, type) => {
    if (tickersArr.length >= MAX_ALLOWED_TICKERS)
      return;

    let arr = [...tickersArr];
    arr.push({ tickerName, type: type, currentPrice: 0, prevPrice: 0 });
    setTickersArr(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, PRICE_UPDATE_DELAY);

    return () => clearInterval(interval);
  })

  return (
    <>
      <Container>
        {/* <Head>
          Today | Week | Month | Year | All Time
        </Head> */}
        {/* <Head>
          1 DAY | 5 DAY | 1 MONTH | 3 MONTH | 1 YEAR | YTD
        </Head> */}
        {/* <Head>
          {"1 DAY | 5 DAY | 1 MONTH | 3 MONTH | 1 YEAR | YTD".toLowerCase()}
        </Head> */}
        {/* <Head>
          1D | 5D | 1M | 3M | 1Y | YTD
        </Head> */}
        {/* <Head>
          Today | Week | Month | 6 Months | YTD | Year
        </Head> */}
        <Head>
          Today | Week | Month | YTD | Year
        </Head>
        <GridContainer>
          {tickersArr.map((t, keyIndex) => (
            <Ticker
              key={keyIndex}
              tickerName={t.tickerName}
              type={t.type}
              price={t.currentPrice}
              prevPrice={t.prevPrice}
              priceDifference={t.day.priceDifference}
              getTickerFontAndBGColors={getTickerFontAndBGColors}
            />)
          )}
        </GridContainer>
        <AddTickerInputField handleAddTicker={handleAddTicker} />
      </Container>
    </>
  );
}

const Head = styled.div`
  display: flex;
  color: white;
  margin-left: 1rem;
`;

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
      tickerName: "BTC",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "ETH",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "TWTR",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "YOLO",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "BOTZ",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "AAPL",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "AMZN",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "GOOGL",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "TSLA",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "VTSAX",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
    {
      tickerName: "UBER",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      day: {
        priceDifference: 0,
        percentage: 0.0
      }
    },
  ]
}

export default TickerGallery;