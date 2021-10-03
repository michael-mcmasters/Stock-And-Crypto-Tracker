import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Popup = ({ handleClickOK, handleClickCancel, failedToFetchTickers }) => {

  const COLORS = useContext(ColorThemeContext);
  const popupElement = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      const clickedOutsidePopup = (event) => popupElement.current !== null && !popupElement.current.contains(event.target);
      if (clickedOutsidePopup(event)) {
        handleClickCancel();
      }
    }
    const handleKeydown = (event) => {
      switch (event.keyCode) {
        case 13:                  // Enter key
          handleClickOK();
          break;
        case 27:                  // Escape key
          handleClickCancel();
          break;
      }
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [handleClickOK])

  let failedTickersStr = "";
  if (failedToFetchTickers.length === 1) {
    failedTickersStr = failedToFetchTickers[0];
  } else if (failedToFetchTickers.length === 2) {
    failedTickersStr = `${failedToFetchTickers[0]} and ${failedToFetchTickers[1]}`;
  } else if (failedToFetchTickers.length >= 3) {
    const lastTicker = failedToFetchTickers.pop();    // ToDo: Need to test this condition. Didn't see it working.
    failedTickersStr = failedToFetchTickers.join(", ");
    failedTickersStr += `and ${lastTicker}`;
  }

  return (
    <Container ref={popupElement} colors={COLORS}>
      <Text colors={COLORS}>
        Sorry, unable to fetch {failedTickersStr}.
      </Text>
      <Button colors={COLORS} onClick={handleClickOK}>
        Okay
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  -webkit-transform:translateX(-50%);
  padding: 1rem 1.3rem;
  border: 2px solid ${props => props.colors.darkPurple};
  border-radius: 10px;
  box-shadow: 15px 15px 10px rgba(0, 0, 0, 0.8);
  background-color: ${props => props.colors.purple};
  z-index: 1;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0 0 1.1rem 0;
  font-size: 1.3rem;
  color: ${props => props.colors.pureWhite};
`;

const Button = styled.button`
  display: block;
  font-size: 1.1rem;
  margin-left: auto;
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.colors.blue};
  color: ${props => props.colors.pureWhite};
  cursor: pointer;
`;

export default Popup;