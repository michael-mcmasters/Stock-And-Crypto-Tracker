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

  const getPrice = (index) => {
    const arr = [...tickersArr];
    arr[index].price = (Math.random() * 10).toFixed(6);
    setTickersArr(arr);
    return arr[index].price;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ok");
      getPrice(0);
    }, 4000);
    return () => clearInterval(interval);
  })

  return (
    <Container>
      {tickersArr.map((t, i) => (
        <Coin
          key={i}
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