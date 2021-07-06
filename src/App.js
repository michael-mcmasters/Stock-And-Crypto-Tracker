import styled from "styled-components";
import Coin from "./components/Coin";
import './App.css';

function App() {
  return (
    <Container>
      <Coin />
      <Coin />
      <Coin />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
  width: 70%;
  margin: 3em auto 0 auto;
`;

export default App;
