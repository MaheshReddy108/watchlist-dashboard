const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const symbolRouter = require('./routes/symbols')
const watchlistRouter = require('./routes/watchlist')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the routes
app.use('/',symbolRouter );
app.use('/',watchlistRouter );


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });