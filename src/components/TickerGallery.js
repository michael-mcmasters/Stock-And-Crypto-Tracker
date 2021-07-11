import { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";

const MAX_ALLOWED_TICKERS = 12;
const PRICE_UPDATE_DELAY = 5000;    // 5 seconds
const DEBUG_USE_FAKE_PRICES = true;


function TickerGallery() {

  const colors = useContext(ColorThemeContext);
  const [tickersArr, setTickersArr] = useState(getTickerObjects());

  const updatePrices = () => {
    if (DEBUG_USE_FAKE_PRICES) {
      let arr = [...tickersArr];
      for (let i = 0; i < arr.length; i++) {
        arr[i].prevPrice = tickersArr[i].price;
        arr[i].price = (Math.random() * 10).toFixed(6);
      }
      setTickersArr(arr);

    } else {
      let arr = [...tickersArr];
      for (let i = 0; i < arr.length; i++) {
        fetch(`http://localhost:8080/${arr[i].type}/${arr[i].tickerName}`)
          .then(res => res.json())
          .then(res => {
            arr[i].prevPrice = tickersArr[i].price;
            let price = res.price?.replace(",", "");
            if (price != null) {
              arr[i].price = Number(price);
            }
          });
      }
      setTickersArr(arr);
    }
  }

  const getTickerColors = (price, prevPrice) => {
    if (price > prevPrice)
      return [colors.green, colors.regularGreen];

    return [colors.brightRed, colors.darkRed];
  }

  const handleAddTicker = (tickerName, type) => {
    if (tickersArr.length >= MAX_ALLOWED_TICKERS)
      return;

    let arr = [...tickersArr];
    arr.push({ tickerName, type: type, price: 0, prevPrice: 0 });
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
        <GridContainer>
          {tickersArr.map((t, keyIndex) => (
            <Ticker
              key={keyIndex}
              tickerObj={t}
              getTickerColors={getTickerColors}
            />)
          )}
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
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
`;


function getTickerObjects() {
  return [
    {
      tickerName: "BTC",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "ETH",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
  ]
}

export default TickerGallery;