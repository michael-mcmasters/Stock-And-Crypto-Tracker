import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./wrappers/ColorThemeContext";
import HistoryOptions from "../constants/HistoryOptions";

const HistoryOptionsGallery = ({ selectedHistoryOption, setSelectedHistoryOption }) => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <>
      <Head>
        <Button colors={COLORS} isSelected={selectedHistoryOption === HistoryOptions.DAY} onClick={() => setSelectedHistoryOption(HistoryOptions.DAY)}>
          Today
        </Button>
        <Button colors={COLORS} isSelected={selectedHistoryOption === HistoryOptions.WEEK} onClick={() => setSelectedHistoryOption(HistoryOptions.WEEK)}>
          Week
        </Button>
        <Button colors={COLORS} isSelected={selectedHistoryOption === HistoryOptions.MONTH} onClick={() => setSelectedHistoryOption(HistoryOptions.MONTH)}>
          Month
        </Button>
        <Button colors={COLORS} isSelected={selectedHistoryOption === HistoryOptions.YTD} onClick={() => setSelectedHistoryOption(HistoryOptions.YTD)}>
          YTD
        </Button>
        <Button colors={COLORS} isSelected={selectedHistoryOption === HistoryOptions.YEAR} onClick={() => setSelectedHistoryOption(HistoryOptions.YEAR)}>
          Year
        </Button>
      </Head>
    </>
  );
};

const Head = styled.div`
  margin-left: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: none;
  padding: 0.2rem 0.4rem;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  transition: 0.2s;
  
  background-color: ${props => props.isSelected ? props.colors.purple : ""};
  
  :hover {
    cursor: pointer;
    border: 2px solid ${props => props.colors.purple};
  }
`;

export default HistoryOptionsGallery;