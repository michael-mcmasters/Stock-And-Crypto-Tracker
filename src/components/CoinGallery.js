import { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import styled from "styled-components";
import Coin from "./Coin";
import Button from "./Button";

function CoinGallery() {

  const colors = useContext(ColorThemeContext);
  const [tickersArr, setTickersArr] = useState([
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
  ]);

  const updatePrices = (useFakeData = false) => {
    if (useFakeData) {
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
            let price = res.price.replace(",", "");
            arr[i].price = Number(price);
          });
      }
      setTickersArr(arr);
    }
  }

  const getTickerColors = (price, prevPrice) => {
    if (price > prevPrice) {
      return [colors.green, colors.regularGreen];
    }
    return [colors.brightRed, colors.darkRed];
  }

  const handleAddTicker = (tickerName, type) => {
    let arr = [...tickersArr];
    arr.push({ tickerName: tickerName, type: type });
    setTickersArr(arr);
  }

  useEffect(() => {
    const intervalDelayTime = 5000;
    const interval = setInterval(() => {
      updatePrices(true);
    }, intervalDelayTime);
    return () => clearInterval(interval);
  })

  return (
    <>
      <Container>
        {tickersArr.map((t, keyIndex) => (
          <Coin
            key={keyIndex}
            tickerObj={t}
            getTickerColors={getTickerColors}
          />)
        )}
      </Container>
      <Button handleAddTicker={handleAddTicker} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70%;
  max-width: 775px;
  margin: 3em auto 0 auto;
`;

export default CoinGallery;