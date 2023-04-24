const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const symbolRouter = require('./routes/symbols')
const watchlistRouter = require('./routes/watchlist')

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://3.95.239.250:3000',
  optionsSuccessStatus: 200
};




// app.use(cors({ origin: `http://172.31.21.15:3000` }));

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', `http://172.31.21.15:3000`);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//   res.setHeader('Cache-Control', 'no-cache');
//   next();
// });

Middleware
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
