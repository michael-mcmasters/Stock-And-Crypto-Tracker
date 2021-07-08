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


  // Fetches price and updates array of objects so that they rerender.
  const updatePrices = () => {
    let arr = [...tickersArr];
    for (let i = 0; i < tickersArr.length; i++) {
      arr[i].prevPrice = tickersArr[i].price;
      arr[i].price = (Math.random() * 10).toFixed(6);
    }
    setTickersArr(arr);
  }

  const getTickerColors = (price, prevPrice) => {
    if (price < prevPrice)
      return [colors.brightRed, colors.darkRed];
    return [colors.green, colors.regularGreen];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 5000);
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