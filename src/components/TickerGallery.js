import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import Ticker2 from "./Ticker2";
import Popup from './Popup';
import HistoryOptionsGallery from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";
import AddTickerInputField from "./AddTickerInputField";
import DragAndDropWrapper from "./DragAndDropWrapper";
import useDragAndDrop from "./custom_hooks/UseDragAndDrop";
import useTickersAPI from "./custom_hooks/UseTickersAPI";
import deepCopy from "./utils/DeepCopy";
import generateKey from "./utils/KeyGenerator"


const PRICE_UPDATE_DELAY = 5000; // 5000 is 5 seconds
const MAX_ALLOWED_TICKERS = 16;


function TickerGallery() {

  const [selectedHistoryOption, setSelectedHistoryOption] = useState(HistoryOptions.DAY);
  const [tickersArr, setTickersArr, dragAndDropHandlers, dragAndDropGetters] = useDragAndDrop(getTickerObjects(), false);

  const fetchPrice = useTickersAPI();
  const [fetchImmediately, setFetchImmediately] = useState(true);
  const [tickersFailedToFetch, setTickersFailedToFetch] = useState([]);

  
  const createFetchPromises = useCallback(() => {
    let tickersArrCopy = deepCopy(tickersArr);
    let fetchPricePromises = [];
    for (let i = 0; i < tickersArr.length; i++) {
      fetchPricePromises.push(new Promise(async (resolve, reject) => {
        try {
          tickersArrCopy[i] = await fetchPrice(tickersArrCopy[i]);
          tickersArrCopy[i].loading = false;
          resolve(tickersArrCopy[i]);
        } catch (exc) {
          resolve(tickersArrCopy[i]);
        }
      }))
    }
    return fetchPricePromises;
  }, [fetchPrice, tickersArr])
  
  // Continuously fetches prices on a loop. Only re-renders once all prices are fetched.
  useEffect(() => {
    let cancelFetch = false;
    let timeoutDelay = fetchImmediately ? 0 : PRICE_UPDATE_DELAY;

    setTimeout(() => {
      if (cancelFetch) return;

      Promise.all(createFetchPromises()).then(resolvedTickers => {
        if (cancelFetch) return;
        
        const fetchedTickers = resolvedTickers.filter(t => t.loading === false);
        const failedTickers = resolvedTickers.filter(t => t.loading === true);
        if (failedTickers.length > 0) {
          setTickersFailedToFetch(failedTickers.map(t => t.tickerName));
        }
        setTickersArr(fetchedTickers);
        setFetchImmediately(false);
        dragAndDropHandlers.setAllowDragAndDrop(true);
      })
    }, timeoutDelay);

    // Cancels fetch if user modifies tickersArr (such as adding/deleting a new ticker) so that fetched results don't overwrite user's changes.
    return () => cancelFetch = true;
  }, [tickersArr]);

  const handleAddTicker = (name, type) => {
    if (tickersArr.length + 1 > MAX_ALLOWED_TICKERS)
      return;

    let tickersArrCopy = deepCopy(tickersArr);
    tickersArrCopy.push({
      key: generateKey(),
      tickerName: name,
      type: type,
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    });
    setTickersArr(tickersArrCopy);
    setFetchImmediately(true);
    dragAndDropHandlers.setAllowDragAndDrop(false);
  }
  
  const handleDeleteTicker = (index) => {
    console.log('del ticic')
    setTickersArr(tickersArr.filter((t, ind) => ind !== index));
  }

  const getPopupErrorMessage = (failedToFetchTickers) => {
    let errorMessage = "";
    switch (failedToFetchTickers.length) {
      case 1:
        errorMessage = `Unable to fetch the price of ${failedToFetchTickers[0]}`;
        break;
      case 2:
        errorMessage = `Unable to fetch the prices of ${failedToFetchTickers[0]} and ${failedToFetchTickers[1]}`;
        break;
      default:
        errorMessage = `Unable to fetch the prices of the most recently added tickers.`;
        break;
    }
    return errorMessage;
  }
  
  const handlePopupClickOK = () => {
    setTickersFailedToFetch([]);
  }


  return (
    <>
      <Container>
        <HistoryOptionsGallery selectedHistoryOption={selectedHistoryOption} setSelectedHistoryOption={setSelectedHistoryOption} />
        {/* <GridContainer>
          {tickersArr.map((t, index) => (
            <Ticker
              key={t.key}
              index={index}
              tickerName={t.tickerName}
              type={t.type}
              loading={t.loading}
              price={t.currentPrice}
              priceDifference={t.priceChanges[selectedHistoryOption].priceDifference}
              percentage={t.priceChanges[selectedHistoryOption].percentage}
              handleDeleteTicker={handleDeleteTicker}
              dragAndDropHandlers={dragAndDropHandlers}
              allowDragAndDrop={dragAndDropGetters.getAllowDragAndDrop()}
              beingDragged={dragAndDropGetters.getBeingDragged(index)}
              hitboxDetectingDraggedItem={dragAndDropGetters.getHitboxDetectingDraggedItem(index)}
              swapped={dragAndDropGetters.getSwapped(index)}
            />
          ))}
        </GridContainer> */}
        
        {/* <DragAndDropWrapper dragAndDropHandlers={dragAndDropHandlers} dragAndDropGetters={dragAndDropGetters} render={() => (
          <GridContainer>
            {tickersArr.map((t, index) => (
              <Ticker2
                key={t.key}
                index={index}
                tickerName={t.tickerName}
                type={t.type}
                loading={t.loading}
                price={t.currentPrice}
                priceDifference={t.priceChanges[selectedHistoryOption].priceDifference}
                percentage={t.priceChanges[selectedHistoryOption].percentage}
                handleDeleteTicker={handleDeleteTicker}
              />
            ))}
          </GridContainer>
        )}/> */}
        
        <GridContainer>
          <DragAndDropWrapper
            dragAndDropHandlers={dragAndDropHandlers}
            dragAndDropGetters={dragAndDropGetters}
            render={() => (tickersArr.map((t, index) => (
              <Ticker2
                key={t.key}
                index={index}
                tickerName={t.tickerName}
                type={t.type}
                loading={t.loading}
                price={t.currentPrice}
                priceDifference={t.priceChanges[selectedHistoryOption].priceDifference}
                percentage={t.priceChanges[selectedHistoryOption].percentage}
                handleDeleteTicker={handleDeleteTicker}
              />))
          )} />
        </GridContainer>
        
        
        
        {/* <DragAndDropWrapper props={tickersArr} /> */}
        
        {/* <DragAndDropWrapper comp={<tickersArr />} /> */}
        
        <AddTickerInputField handleAddTicker={handleAddTicker} />
      </Container>

      {tickersFailedToFetch.length > 0 &&
        <Popup errorMessage={getPopupErrorMessage(tickersFailedToFetch)} handleClickOK={handlePopupClickOK} handleClickCancel={handlePopupClickOK} />
      }
    </>
  );
}

const Container = styled.div`
  width: min-content;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, auto);
  @media (max-width: 850px) {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(3, auto);
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
`;

function getTickerObjects() {
  return [
    {
      key: generateKey(),
      tickerName: "TWTR",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "AAPL",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "BOTZ",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "AMZN",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "BTC",
      type: "crypto",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "ETH",
      type: "crypto",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "DOGE",
      type: "crypto",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "GOOGL",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "TSLA",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "UBER",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "LYFT",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
    {
      key: generateKey(),
      tickerName: "VTSAX",
      type: "stock",
      loading: true,
      currentPrice: 0,
      priceChanges: {
        day: {
          priceDifference: 0,
          percentage: 0.0,
        },
        week: {
          priceDifference: 0,
          percentage: 0,
        },
        month: {
          priceDifference: 0,
          percentage: 0,
        },
        ytd: {
          priceDifference: 0,
          percentage: 0,
        },
        year: {
          priceDifference: 0,
          percentage: 0
        }
      }
    },
  ];
}

export default TickerGallery;