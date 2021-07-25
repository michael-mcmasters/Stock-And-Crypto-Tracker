import React from 'react';
import styled from 'styled-components';

const HistoryOptions = () => {
  return (
    <div>
      <Head>Today | Week | Month | YTD | Year</Head>
    </div>
  );
};

const Head = styled.div`
  display: flex;
  color: white;
  margin-left: 1rem;
`;

export default HistoryOptions;