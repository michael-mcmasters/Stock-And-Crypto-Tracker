import React, { useState, useContext } from 'react';
import styled, { css } from "styled-components";
import { ColorThemeContext } from "./wrappers/ColorThemeContext";

const Toggle = () => {
  const COLORS = useContext(ColorThemeContext);
  const [enabled, setEnabled] = useState(false);
  
  return (
    <ToggleContainer COLORS={COLORS} enabled={enabled} onClick={() => setEnabled(!enabled)}>
      <Circle enabled={enabled}></Circle>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  padding: 0.2rem 0.3rem;
  width: 2.2rem;
  border-radius: 100px;
  background-color: #CCCCCC;
  display: flex;
  align-items: center;
  
  cursor: pointer;
  transition: 0.2s;
  ${props => props.enabled && css`
    background-color: ${props => props.COLORS.blue};
  `};
`;

const Circle = styled.div`
  padding: 0.5rem;
  background-color: #FFFFFF;  
  border-radius: 9999px;
  width: 0.1rem;
  height: 0.1rem;
  
  transition: 0.2s;
  ${props => props.enabled && css`
    margin-left: 100%;
    transform: translateX(-100%);
  `};
`;

export default Toggle;