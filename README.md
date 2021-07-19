## Stock-And-Crypto-Tracker

A full stack web application that shows real-time prices of various stocks and cryptocurrencies. It does this by making GET requests to the [Spring back end](https://github.com/michael-mcmasters/Stock-And-Crypto-Backend-WebScraper) every 5 seconds, which web scrapes various websites to return the ticker's current and historic prices. The user can add or remove any ticker they wish to see.
<br>
<br>
This application is a work in progress.
<br>

<img src="/public/frontpage.png" />

## To Run Locally
Using Node
```
git clone https://github.com/michael-mcmasters/Stock-And-Crypto-Tracker.git
cd Stock-And-Crypto-Tracker
npm install
npm start
```

To see real-time data, go to src/components/TickerGallery.js and set DEBUG_USE_FAKE_PRICES to false.

Then clone the [Spring back-end](https://github.com/michael-mcmasters/Stock-And-Crypto-Backend-WebScraper) and run it locally on port 8080 (the default for Spring applications). The back end will scrape the web for the real time prices.
