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
  const [tickersArr, setTickersArr, dragAndDropHandlers, dragAndDropGetters] = useDragAndDrop(getTickerObjects(), false);

  const [fetchPrice, fetchPrices] = useTickersAPI();
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [fetchImmediately, setFetchImmediately] = useState(false);

  // Fetches prices one-by-one on page load. Re-renders for every price fetched.
  useEffect(() => {
    let fetchPricePromises = [];
    for (let i = 0; i < tickersArr.length; i++) {
      fetchPricePromises.push(
        new Promise(async (resolve, reject) => {
          const tickersArrCopy = [...tickersArr];
          tickersArrCopy[i] = await fetchPrice(tickersArr[i]);
          tickersArrCopy[i].loading = false;
          setTickersArr(tickersArrCopy);
          resolve(tickersArrCopy[i]);
        })
      );
    }
    Promise.all(fetchPricePromises).then(values => {
      setInitialFetchCompleted(true);
      dragAndDropHandlers.setAllowDragAndDrop(true);
      console.log("Completed fetching initial prices for tickers");
    });
  }, [])

  // Continuously fetches prices on a loop. Only re-renders once all prices are fetched.
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
      cancelFetch = true;               // Cancels fetch if user modifies tickersArr (such as adding/deleting a new ticker) so that fetched results don't overwrite user's changes.
      setFetchImmediately(false);
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
              allowDragAndDrop={dragAndDropGetters.getAllowDragAndDrop()}
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
