const express = require('express');
const router = express.Router();

const watchlistController = require('../controllers/watchlistController');

router.get('/watchlist/:accountId', watchlistController.getWatchlistData);
router.post('/watchlist/:accountId/add', watchlistController.addToWatchlist);
router.delete('/watchlist/:accountId/remove', watchlistController.removeFromWatchlist);

module.exports = router;
