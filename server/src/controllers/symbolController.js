const fs = require('fs');
const path = require('path');
const axios = require('axios');
const symbolDataPath = path.join(__dirname, '../data/symbols.json');
const API_KEY = process.env.API_KEY;

const getSymbolData = (req, res) => {
  const { symbol } = req.params;
  const API_KEY = 'your_alphavantage_api_key';

  axios
    .get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    .then(response => {
      const { data } = response;
      console.log("MAHESH response", data);
      
      const quote = data['Global Quote'];
      const bidPrice = quote['04. low'];
      const askPrice = quote['03. high'];
      const bidSize = quote['02. open'];
      const askSize = quote['05. price'];
      const volume = quote['06. volume'];
      
      const responseData = {
        bidPrice,
        askPrice,
        bidSize,
        askSize,
        volume,
      };
      
      return res.json(responseData);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching symbol data from API' });
    });

  
};


module.exports = { getSymbolData };

module.exports = {
  getSymbolData,
};

