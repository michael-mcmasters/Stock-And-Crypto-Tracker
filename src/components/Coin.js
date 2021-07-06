import styled from "styled-components";
import React from 'react';

const Coin = () => {
  return (
    <Container>
      <CoinTicker>Btc</CoinTicker>
      <Price>$33,786.51</Price>
    </Container>
  );
};

const Container = styled.div`
  width: 10em;
  border: 1px solid blue;
  border-radius: 10px;
  margin: 1em;
  text-align: center;
  color: green;
  padding-top: 1em;
  padding-bottom: 1em;
`;

const CoinTicker = styled.div`
  color: green;
`;

const Price = styled.div`
  margin-top: 0.5em;
  color: green;
`;

export default Coin;