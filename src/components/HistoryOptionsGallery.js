import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./wrappers/ColorThemeContext";
import HistoryOptions from "../constants/HistoryOptions";

const HistoryOptionsGallery = ({ selectedHistoryOption, setSelectedHistoryOption }) => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <>
      <Head>
        <Button colors={COLORS} selected={selectedHistoryOption === HistoryOptions.DAY} onClick={() => setSelectedHistoryOption(HistoryOptions.DAY)}>
          Today
        </Button>
        <Button colors={COLORS} selected={selectedHistoryOption === HistoryOptions.WEEK} onClick={() => setSelectedHistoryOption(HistoryOptions.WEEK)}>
          Week
        </Button>
        <Button colors={COLORS} selected={selectedHistoryOption === HistoryOptions.MONTH} onClick={() => setSelectedHistoryOption(HistoryOptions.MONTH)}>
          Month
        </Button>
        <Button colors={COLORS} selected={selectedHistoryOption === HistoryOptions.YTD} onClick={() => setSelectedHistoryOption(HistoryOptions.YTD)}>
          YTD
        </Button>
        <Button colors={COLORS} selected={selectedHistoryOption === HistoryOptions.YEAR} onClick={() => setSelectedHistoryOption(HistoryOptions.YEAR)}>
          Year
        </Button>
      </Head>
    </>
  );
};

const Head = styled.div`
  display: flex;
  color: white;
  margin-left: 1rem;
  font-size: 1rem;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: inherit;
  transition: 0.2s;
  
  background-color: ${props => props.selected ? props.colors.purple : ""};
  
  :hover {
    cursor: pointer;
    background-color: ${props => props.colors.purple};
  }
`;

export default HistoryOptionsGallery;