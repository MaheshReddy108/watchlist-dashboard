const express = require('express');
const router = express.Router();
const symbolController = require('../controllers/symbolController');

router.get('/symbol/:symbol', symbolController.getSymbolData);
router.get('/allsymbols/', symbolController.getAllSymbols);

module.exports = router;
