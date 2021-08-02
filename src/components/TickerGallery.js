import { useState, useEffect } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";
import HistoryOptionsGallery from "./HistoryOptionsGallery";
import HistoryOptions from "../constants/HistoryOptions";

const DEBUG_USE_FAKE_PRICES = false;
const MAX_ALLOWED_TICKERS = 16;
const PRICE_UPDATE_DELAY = 5000; // 5000 is 5 seconds

function TickerGallery() {

  const [tickersArr, setTickersArr] = useState(getTickerObjects());
  const [selectedHistoryOption, setSelectedHistoryOption] = useState(HistoryOptions.DAY);

  // ToDo
  const handleAddTicker = async (tickerName, type) => {
    if (tickersArr.length >= MAX_ALLOWED_TICKERS) return;

    let newTicker = await fetchAPI({ tickerName, type });
    console.log(newTicker);

    let tickersArrCopy = [...tickersArr];
    tickersArrCopy.push(newTicker);
    setTickersArr(tickersArrCopy);
  };


  // Example URI: http://localhost:8080/stock/botz
  const fetchAPI = async (ticker) => {
    try {
      let response = await fetch(`http://localhost:8080/${ticker.type}/${ticker.tickerName}`);
      response = await response.json();
      console.log(response);
      return response;
    } catch (e) {
      return ticker;
    }
  }

  useEffect(() => {

    const fetchUpdatedPrices = async () => {
      let arr = [...tickersArr];
      if (!DEBUG_USE_FAKE_PRICES) {
        for (let i = 0; i < arr.length; i++) {
          try {
            let response = await fetchAPI(arr[i]);
            arr[i].currentPrice = response.currentPrice;
            arr[i].day.priceDifference = response.day.priceDifference;
            arr[i].day.percentage = response.day.percentage;
            arr[i].week.priceDifference = response.week.priceDifference;
            arr[i].week.percentage = response.week.percentage;
            arr[i].month.priceDifference = response.month.priceDifference;
            arr[i].month.percentage = response.month.percentage;
            arr[i].ytd.priceDifference = response.ytd.priceDifference;
            arr[i].ytd.percentage = response.ytd.percentage;
            arr[i].year.priceDifference = response.year.priceDifference;
            arr[i].year.percentage = response.year.percentage;
          } catch (e) {
            console.log(`Could not fetch ${arr[i].tickerName}`);
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          const prevPrice = tickersArr[i].currentPrice;
          arr[i].currentPrice = (Math.random() * 10).toFixed(6);
          arr[i].day.priceDifference = (arr[i].currentPrice - prevPrice).toFixed(2);    // priceDifference and percentage are not mathematically correct. These numbers are just for visualizing.
          arr[i].day.percentage = (Math.random() * 4).toFixed(2);
          arr[i].week.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
          arr[i].week.percentage = (Math.random() * 5).toFixed(2);
          arr[i].month.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
          arr[i].month.percentage = (Math.random() * 6).toFixed(2);
          arr[i].ytd.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
          arr[i].ytd.percentage = (Math.random() * 7).toFixed(2);
          arr[i].year.priceDifference = (Math.random() * 4 - prevPrice).toFixed(2);
          arr[i].year.percentage = (Math.random() * 8).toFixed(2);
        }
      }
      return arr;
    }

    console.log("CALLED");
    let newTickerAdded = false;   // If true, fetched results will be ignored so that new ticker is not deleted.
    fetchUpdatedPrices().then(data => {
      if (!newTickerAdded) {
        setTickersArr(data);
      }
    })

    return () => {
      newTickerAdded = true;
      console.log("Clearing");
    }
  }, [tickersArr]);

  return (
    <>
      <Container>
        <HistoryOptionsGallery selectedHistoryOption={selectedHistoryOption} setSelectedHistoryOption={setSelectedHistoryOption} />
        <GridContainer>
          {tickersArr.map((t, keyIndex) => (
            <Ticker
              key={keyIndex}
              tickerName={t.tickerName}
              type={t.type}
              price={t.currentPrice}
              priceDifference={t[selectedHistoryOption].priceDifference}
              percentage={t[selectedHistoryOption].percentage}
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
      tickerName: "TWTR",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "AAPL",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "BOTZ",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "AMZN",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "BTC",
      type: "crypto",
      currentPrice: 0,
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
    },
    {
      tickerName: "ETH",
      type: "crypto",
      currentPrice: 0,
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
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      currentPrice: 0,
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
    },
    {
      tickerName: "GOOGL",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "TSLA",
      type: "stock",
      currentPrice: 0,
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
    },
    // {
    //   tickerName: "VTSAX",
    //   type: "stock",
    //   currentPrice: 0,
    //   priceDifference: 0,
    //   percentage: 0.0,
    // },
    {
      tickerName: "UBER",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "LYFT",
      type: "stock",
      currentPrice: 0,
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
    },
    {
      tickerName: "VTSAX",
      type: "stock",
      currentPrice: 0,
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
    },
  ];
}

export default TickerGallery;
