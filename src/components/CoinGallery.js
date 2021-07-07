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

  const getPrice = () => {
    return (Math.random() * 10).toFixed(6);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ok");
    }, 4000);
    return () => clearInterval(interval);
  })

  return (
    <Container>
      {/* <Coin coinTicker={"BTC"} price={"$33,786.51"} />
      <Coin coinTicker={"ETH"} price={"$2,221.79"} />
      <Coin coinTicker={"DOGE"} price={"$0.234209"} /> */}

      {/* <Coin coinTicker={"BTC"} price={getPrice()} />
      <Coin coinTicker={"ETH"} price={getPrice()} />
      <Coin coinTicker={"DOGE"} price={getPrice()} /> */}

      {tickersArr.map(t => (
        <Coin
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