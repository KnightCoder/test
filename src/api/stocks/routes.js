const express = require('express');
const app = express();
const router = express.Router();

const trades = require('../trades/routes.js');

router.get('/:symbol/trades', trades.getWhereStocksBetweenDateFunc)
	.get('/:symbol/price', trades.getWhereStocksPriceFunc);

module.exports = router;