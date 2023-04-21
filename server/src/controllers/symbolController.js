const fs = require("fs");
const path = require("path");
const util = require("util");
const symbolDataPath = path.join(__dirname, "../data/symbols.json");

const readFile = util.promisify(fs.readFile);

const getSymbolData = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const data = await readFile(symbolDataPath);
    const symbolsData = JSON.parse(data);

    if (!symbolsData[symbol]) {
      return res.status(404).json({ error: `Symbol ${symbol} not found in symbols data.` });
    }

    const symbolData = symbolsData[symbol];

    return res.json(symbolData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to read symbols data.' });
  }
};

const getAllSymbols = async (req, res) => {
  try {
    const data = await readFile(symbolDataPath);
    const symbols = Object.keys(JSON.parse(data));
    res.json(symbols);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSymbolData,getAllSymbols };
