import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorThemeContext } from "./custom_hooks/ColorThemeContext";

const HistoryOptions = () => {
  const COLORS = useContext(ColorThemeContext);

  return (
    <div>
      <Head>
        <Button colors={COLORS}>
          Today
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS}>
          Week
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS}>
          Month
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS}>
          YTD
        </Button>
        {/* <span>|</span> */}
        <Button colors={COLORS}>
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

export default HistoryOptions;