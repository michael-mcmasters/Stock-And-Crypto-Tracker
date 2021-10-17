import React from 'react';

const DragAndDropWrapper = ({render}) => {
  
  let tickers = render();
  
  return (
    <div>
      {/* {tickers.map(t => (
        t,
      ))} */}
      
      {tickers}
    </div>
  );
};

export default DragAndDropWrapper;