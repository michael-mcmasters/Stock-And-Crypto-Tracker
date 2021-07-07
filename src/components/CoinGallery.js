import { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
import styled from "styled-components";
import Coin from "./Coin";

function CoinGallery() {

  const colors = useContext(ColorThemeContext);
  const [tickersArr, setTickersArr] = useState([
    {
      ticker: "BTC",
      price: 0
    },
    {
      ticker: "ETH",
      price: 0
    },
    {
      ticker: "DOGE",
      price: 0
    },
  ]);


  const getTickerColors = (price) => {
    if (price < 0.5)
      return [colors.brightRed, colors.darkRed];
    return [colors.green, colors.regularGreen];
  }

  // Fetches price and updates array of objects so that they rerender.
  // ToDo: Maybe create bullet toggle to load prices all at same time, or to do separately.
  const updatePrice = (index) => {
    const arr = [...tickersArr];
    arr[index].price = (Math.random() * 10).toFixed(6);
    setTickersArr(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tickersArr.length);
      updatePrice(randomIndex);
    }, 1000);
    return () => clearInterval(interval);
  })

  return (
    <Container>
      {tickersArr.map((t, keyIndex) => (
        <Coin
          key={keyIndex}
          coinTicker={t.ticker}
          price={t.price}
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