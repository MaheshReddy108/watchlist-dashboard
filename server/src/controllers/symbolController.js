const fs = require("fs");
const path = require("path");
const axios = require("axios");
const symbolDataPath = path.join(__dirname, "../data/symbols.json");
const API_KEY = process.env.API_KEY;
const finnhub = require('finnhub');

const getSymbolData = (req, res) => {
  const { symbol } = req.params;
 
  
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "ch0pki9r01qhadkoh8kgch0pki9r01qhadkoh8l0"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.stockBidask("AAPL", (error, data, response) => {
  console.log(data)
  res.json(data);
});

  // const API_KEY = "your_alphavantage_api_key";
  // const symbol = req.params.symbol;
//   const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbol=${symbol}`;

//   axios.get(url)
//     .then(response => {
//       const data = response.data.quoteResponse.result[0];
//       const symbolData = {
//         bid: data.bid,
//         ask: data.ask,
//         bidSize: data.bidSize,
//         askSize: data.askSize,
//         volume: data.volume
//       };
//       res.json(symbolData);
//     })
//     .catch(error => {
//       console.error(error);
//       return res
//         .status(500)
//         .json({ error: "Error fetching symbol data from API" });
//     });
};

module.exports = { getSymbolData };

module.exports = {
  getSymbolData
};
