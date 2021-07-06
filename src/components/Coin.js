import styled from "styled-components";
import React from 'react';

const colors = {
  blue: "#90D76F",
  green: "#689557",
  purple: "#9942B6",
  yellow: "#E9D466",
  black: "#23262E",
  white: "#C6C6C6"
}

const Coin = ({ coinTicker, price }) => {
  return (
    <Container colors={colors}>
      <CoinTicker>{coinTicker.toUpperCase()}</CoinTicker>
      <Price>{price}</Price>
    </Container>
  );
};

const Container = styled.div`
  width: 10em;
  border-radius: 10px;
  margin: 1em;
  text-align: center;
  color: green;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: ${props => props.colors.blue};
  `;

const CoinTicker = styled.div`
  font-weight: bold;
  color: green;
`;

const Price = styled.div`
  margin-top: 0.5em;
  color: green;
`;

export default Coin;