import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";
//import HistoryOptions from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";

const HistoryOptionsGallery = ({ handleClickHistoryOption }) => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <div>
      <Head>
        <Button colors={COLORS} onClick={() => handleClickHistoryOption(HistoryOptions.DAY)}>
          Today
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS} onClick={() => {
          console.log("ON cLICK")
          handleClickHistoryOption(HistoryOptions.WEEK)
        }}>
          Week
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS} onClick={() => handleClickHistoryOption(HistoryOptions.MONTH)}>
          Month
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS} onClick={() => handleClickHistoryOption(HistoryOptions.YTD)}>
          YTD
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS} onClick={() => handleClickHistoryOption(HistoryOptions.YEAR)}>
          Year
        </Button>
      </Head>
    </div>
  );
};

const Head = styled.div`
  display: flex;
  color: white;
  margin-left: 1rem;
  font-size: 1rem;
  
  ::nth-child() {
    border-right: 1px solid white;
  }
  
  ::nth-last-child() {
    border-right: none;

  }
`;

const Button = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: inherit;
  /* border-right: 1px solid white; */
  transition: 0.2s;
  
  :hover {
    cursor: pointer;
    background-color: ${props => props.colors.purple};
  }
`;

export default HistoryOptionsGallery;