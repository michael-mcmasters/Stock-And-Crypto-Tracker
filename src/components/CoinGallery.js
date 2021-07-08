import { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import styled from "styled-components";
import Coin from "./Coin";

function CoinGallery() {

  const colors = useContext(ColorThemeContext);
  const [tickersArr, setTickersArr] = useState([
    {
      ticker: "BTC",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      ticker: "ETH",
      type: "crypto",
      price: 0,
      prevPrice: 0
    },
    {
      ticker: "DOGE",
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
        fetch(`http://localhost:8080/${arr[i].type}/${arr[i].ticker}`)
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

  useEffect(() => {
    const intervalDelayTime = 5000;
    const interval = setInterval(() => {
      updatePrices();
    }, intervalDelayTime);
    return () => clearInterval(interval);
  })

  return (
    <Container>
      {tickersArr.map((t, keyIndex) => (
        <Coin
          key={keyIndex}
          coinTicker={t.ticker}
          price={t.price}
          prevPrice={t.prevPrice}
          getTickerColors={getTickerColors}
        />)
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 3em auto 0 auto;
`;

export default CoinGallery;