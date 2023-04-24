const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const symbolRouter = require('./routes/symbols')
const watchlistRouter = require('./routes/watchlist')

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://3.95.239.250',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors({
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the routes
app.use('/',symbolRouter );
app.use('/',watchlistRouter );


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
