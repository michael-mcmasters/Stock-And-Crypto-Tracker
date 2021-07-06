import styled from "styled-components";
import Coin from "./Coin";

function CoinGallery() {
  return (
    <Container>
      <Coin coinTicker={"BTC"} price={"$33,786.51"} />
      <Coin coinTicker={"ETH"} price={"$2,221.79"} />
      <Coin coinTicker={"DOGE"} price={"$0.234209"} />
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