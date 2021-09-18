import { useState, useEffect } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";
import HistoryOptionsGallery from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";
import useDragAndDrop from "./custom_hooks/UseDragAndDrop";
import useTickersAPI from "./custom_hooks/UseTickersAPI";


const PRICE_UPDATE_DELAY = 5000; // 5000 is 5 seconds
const MAX_ALLOWED_TICKERS = 16;


function TickerGallery() {

  const [selectedHistoryOption, setSelectedHistoryOption] = useState(HistoryOptions.DAY);
  const [tickersArr, setTickersArr, dragAndDropHandlers, dragAndDropGetters] = useDragAndDrop(getTickerObjects());

  const [fetchPrice, fetchPrices] = useTickersAPI();
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [fetchImmediately, setFetchImmediately] = useState(true);

  // Fetch prices one by one on page load
  useEffect(() => {
    for (let i = 0; i < tickersArr.length; i++) {
      fetchPrice(tickersArr[i])
        .then(ticker => {
          const copy = [...tickersArr];
          copy[i].loading = false;
          copy[i] = ticker;
          setTickersArr(copy);
        });
    }
    setInitialFetchCompleted(true);
  }, [])

  // Fetches prices at same time and doesn't update page until all fetches are completed. Does so on a delayed loop.
  useEffect(() => {
    if (!initialFetchCompleted) return;

    let cancelFetch = false;
    let timeoutDelay = fetchImmediately ? 0 : PRICE_UPDATE_DELAY;

    setTimeout(() => {
      if (!cancelFetch) {
        const tickersArrCopy = [...tickersArr];
        fetchPrices(tickersArrCopy)
          .then(tickers => {
            if (!cancelFetch) {
              tickers.forEach(t => t.loading = false);
              setTickersArr(tickers);
            };
          })
          .catch(err => console.log(err));
      };
    }, timeoutDelay);
    setFetchImmediately(false);

    return () => {
      cancelFetch = true                  // Cancel this fetch if tickersArr is updated, (such as user adding a new ticker), so fetched results don't overwrite user's changes.
      setFetchImmediately(false);         // Fetch on page load and when new ticker is added happens immediately. Every other fetch waits a few seconds.
    };
  }, [tickersArr]);


  const handleAddTicker = (name, type) => {
    if (tickersArr.length + 1 > MAX_ALLOWED_TICKERS)
      return;

    let tickersArrCopy = [...tickersArr];
    tickersArrCopy.push({
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
    setFetchImmediately(true);
    setTickersArr(tickersArrCopy);
  };


  return (
    <>
      <Container>
        <HistoryOptionsGallery selectedHistoryOption={selectedHistoryOption} setSelectedHistoryOption={setSelectedHistoryOption} />
        <GridContainer>
          {tickersArr.map((t, index) => (
            <Ticker
              key={index}
              index={index}
              tickerName={t.tickerName}
              type={t.type}
              loading={t.loading}
              price={t.currentPrice}
              priceDifference={t.priceChanges[selectedHistoryOption].priceDifference}
              percentage={t.priceChanges[selectedHistoryOption].percentage}
              dragAndDropHandlers={dragAndDropHandlers}
              beingDragged={dragAndDropGetters.getBeingDragged(index)}
              hitboxDetectingDraggedItem={dragAndDropGetters.getHitboxDetectingDraggedItem(index)}
              swapped={dragAndDropGetters.getSwapped(index)}
            />
          ))}
        </GridContainer>
        <AddTickerInputField handleAddTicker={handleAddTicker} />
      </Container>
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
      key: 0,
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
      key: 1,
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
      key: 2,
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
      key: 3,
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
      key: 4,
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
      key: 5,
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
      key: 6,
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
      key: 7,
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
      key: 8,
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
      key: 9,
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
      key: 10,
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
    // {
    // key: 11,
    // tickerName: "VTSAX",
    // type: "stock",
    // loading: true,
    // currentPrice: 0,
    // priceChanges: {
    //   day: {
    //     priceDifference: 0,
    //     percentage: 0.0,
    //   },
    //   week: {
    //     priceDifference: 0,
    //     percentage: 0,
    //   },
    //   month: {
    //     priceDifference: 0,
    //     percentage: 0,
    //   },
    //   ytd: {
    //     priceDifference: 0,
    //     percentage: 0,
    //   },
    //   year: {
    //     priceDifference: 0,
    //     percentage: 0
    //   }
    // }
    // },
  ];
}

export default TickerGallery;
