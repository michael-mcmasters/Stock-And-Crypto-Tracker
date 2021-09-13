import { useState, useEffect } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";
import HistoryOptionsGallery from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";
import useDragAndDrop from "./custom_hooks/UseDragAndDrop";
import useTickersAPI from "./custom_hooks/UseTickersAPI";

const MAX_ALLOWED_TICKERS = 16;
const PRICE_UPDATE_DELAY = 5000; // 5000 is 5 seconds

function TickerGallery() {

  const [fetchPrices, fetchAPISupportsTicker] = useTickersAPI();
  const [tickersArr, setTickersArr, dragAndDropHandlers, dragAndDropGetters] = useDragAndDrop(getTickerObjects());
  const [selectedHistoryOption, setSelectedHistoryOption] = useState(HistoryOptions.DAY);

  // Fetches prices immediately when page loads.
  useEffect(() => {
    const tickersArrCopy = [...tickersArr];
    fetchPrices(tickersArrCopy)
      .then(data => setTickersArr(data))
      .catch(err => console.log(err));
  }, []);

  // Continusously fetches prices on a delayed loop.
  // Fetch is cancelled and a new fetch is started if tickersArr is modified, such as the user adding a new ticker, so response doesn't overwrite user's changes.
  useEffect(() => {
    let cancelFetch = false;

    setTimeout(() => {
      if (!cancelFetch) {
        const tickersArrCopy = [...tickersArr];
        fetchPrices(tickersArrCopy).then(data => {
          if (!cancelFetch) {
            setTickersArr(data);
          };
        })
          .catch(err => console.log(err));
      };
    }, PRICE_UPDATE_DELAY);

    return () => cancelFetch = true;
  }, [tickersArr]);

  const handleAddTicker = () => { };  // only here to get rid of error.


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
      key: 11,
      tickerName: "VTSAX",
      type: "stock",
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
