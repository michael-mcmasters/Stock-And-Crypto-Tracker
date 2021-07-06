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
  border: 1px solid red;
  width: 70%;
  margin: 0 auto;
`;

export default App;
