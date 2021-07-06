import styled from "styled-components";
import React from 'react';

const Coin = () => {
  return (
    <Container>
      <CoinTicker>Btc</CoinTicker>
      <Price>$99</Price>
    </Container>
  );
};

const Container = styled.div`
  color: green;
`;

const CoinTicker = styled.div`
  color: green;
`;

const Price = styled.div`
  color: green;
`;

export default Coin;