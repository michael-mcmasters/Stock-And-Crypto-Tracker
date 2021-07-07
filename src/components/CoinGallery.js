import { useEffect, useState } from "react";
import styled from "styled-components";
import Coin from "./Coin";

function CoinGallery() {

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

  // ToDo: Maybe create bullet toggle to load prices all at same time, or to do separately.

  // Fetches price and updates array of objects so that they rerender.
  const getPrice = (index) => {
    const arr = [...tickersArr];
    arr[index].price = (Math.random() * 10).toFixed(6);
    setTickersArr(arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * tickersArr.length);
      console.log(index);
      getPrice(index);
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
          getPrice={getPrice}
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