import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const Popup = ({ errorMessage, handleClickOK, handleClickCancel }) => {

  const COLORS = useContext(ColorThemeContext);
  const popupElement = useRef();

  useEffect(() => {
    const handleMouseDown = (event) => {
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
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [handleClickOK])


  return (
    <>
      <Background />

      <Container ref={popupElement} colors={COLORS}>
        <Text colors={COLORS}>
          {errorMessage}
        </Text>
        <Button colors={COLORS} onClick={handleClickOK}>
          Okay
        </Button>
      </Container>
    </>
  );
};

const BackgroundEnabledAnimation = keyframes`
  0% {
    opacity: 0;
  }
`;

const PopupEnabledAnimation = keyframes`
  0% {
    padding: 0rem;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.35;
  z-index: 1;
  
  animation-name: ${BackgroundEnabledAnimation};
  animation-duration: 0.8s;
`;

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
  
  animation-name: ${PopupEnabledAnimation};
  animation-duration: 0.8s;
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