const fs = require("fs");
const util = require('util');
const path = require("path");
const watchlistDataPath = path.join(__dirname, "../data/watchlist.json");
const symbolsDataPath = path.join(__dirname, "../data/symbols.json");
const readFile = util.promisify(fs.readFile);


const getWatchlistData = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("Mahesh accountId", accountId);
    
    // Read the watchlist data from watchlist.json
    const watchlistData = await readFile(watchlistDataPath, 'utf8');
    const {watchlist} = JSON.parse(watchlistData)[accountId];
    console.log("Mahesh accountId", watchlist);
    if (!watchlist) {
      return res
        .status(404)
        .json({ error: `Watchlist not found for account ${accountId}` });
    }

    // Read the symbols data from symbols.json
    const symbolsData = await readFile(symbolsDataPath, 'utf8');

    // Create a new object to store the bid, ask, bid size, ask size, and volume for each symbol
    const watchlistDataObj = {};

    // Loop through the symbols in the user's watchlist
    for (const symbol of watchlist) {
      // Get the data for the symbol from symbols.json
      const symbolData = JSON.parse(symbolsData)[symbol];
      if (symbolData) {
        // Add the bid, ask, bid size, ask size, and volume to the watchlistData object
        watchlistDataObj[symbol] = {
          bid: symbolData.bid,
          ask: symbolData.ask,
          bidSize: symbolData.bidSize,
          askSize: symbolData.askSize,
          volume: symbolData.volume,
        };
      }
    }

    return res.json(watchlistDataObj);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const addToWatchlist = async (req, res) => {
  const accountId = req.params.accountId;
  let symbol = req.body.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  symbol = symbol.toUpperCase();

  try {
    const symbolsData = await fs.promises.readFile(symbolsDataPath);
    const parsedSymbolsData = JSON.parse(symbolsData);
    const symbolData = parsedSymbolsData[symbol];

    if (!symbolData) {
      return res.status(400).json({ error: `Symbol ${symbol} doesn't exist in our database` });
    }

    const watchlistData = await fs.promises.readFile(watchlistDataPath);
    const parsedWatchlistData = JSON.parse(watchlistData);
    const watchlist = parsedWatchlistData[accountId] ? parsedWatchlistData[accountId].watchlist : null;

    if (!watchlist) {
      return res.status(404).json({ error: `Watchlist not found for account ${accountId}` });
    }

    if (watchlist.indexOf(symbol) !== -1) {
      return res.status(400).json({ error: `Symbol ${symbol} is already in the watchlist` });
    }

    watchlist.push(symbol);

    await fs.promises.writeFile(watchlistDataPath, JSON.stringify(parsedWatchlistData));

    res.json({ message: `Symbol ${symbol} added to watchlist` });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error accessing watchlist or symbols data" });
  }
};





const removeFromWatchlist = (req, res) => {
  const { accountId } = req.params;
  const { symbol } = req.body;
  fs.readFile(watchlistDataPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading watchlist data" });
    }
    const watchlistData = JSON.parse(data);
    const accountWatchlist = watchlistData[accountId];
    if (!accountWatchlist || !accountWatchlist.watchlist) {
      return res
        .status(404)
        .json({ error: `Watchlist not found for account ${accountId}` });
    }
    const watchlist = accountWatchlist.watchlist;
    const index = watchlist.indexOf(symbol);
    if (index === -1) {
      return res.status(404).json({
        error: `${symbol} is not in the watchlist for account ${accountId}`,
      });
    }
    watchlist.splice(index, 1);
    fs.writeFile(watchlistDataPath, JSON.stringify(watchlistData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error writing watchlist data" });
      }
      return res.json({ message: `${symbol} removed from watchlist` });
    });
  });
};


  

module.exports = {
  getWatchlistData,
  addToWatchlist,
  removeFromWatchlist
};
