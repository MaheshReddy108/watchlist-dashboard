const fs = require("fs");
const path = require("path");

const watchlistDataPath = path.join(__dirname, "../data/watchlist.json");

const getWatchlistData = (req, res) => {
  const { accountId } = req.params;
  fs.readFile(watchlistDataPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading watchlist data" });
    }
    const watchlistData = JSON.parse(data);
    const watchlist = watchlistData[accountId];
    if (!watchlist) {
      return res
        .status(404)
        .json({ error: `Watchlist not found for account ${accountId}` });
    }
    return res.json(watchlist);
  });
};

const addToWatchlist = (req, res) => {
  const accountId = req.params.accountId;
  const symbol = req.body.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  fs.readFile(watchlistDataPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading watchlist data" });
    }

    const watchlistData = JSON.parse(data);
    const watchlist = watchlistData[accountId] ? watchlistData[accountId].watchlist : null;

    if (!watchlist) {
      return res.status(404).json({ error: `Watchlist not found for account ${accountId}` });
    }

    if (watchlist.indexOf(symbol) !== -1) {
      return res.status(400).json({ error: `Symbol ${symbol} is already in the watchlist` });
    }

    watchlist.push(symbol);

    fs.writeFile(watchlistDataPath, JSON.stringify(watchlistData), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error writing watchlist data" });
      }

      res.json({ message: `Symbol ${symbol} added to watchlist` });
    });
  });
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
