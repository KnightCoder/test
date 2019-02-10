const express = require("express");
const app = express();
const router = express.Router();
const controller = require("./controller.js");

let deleteFunc = async (req, res, next) => {
	const trades = await controller.delete();
	res.sendStatus(200);
};

let getWhereStocksBetweenDateFunc = async (req, res, next) => {
	console.log(req.params);
	console.log(req.query);
	const stocks = await controller.getWhereStocksBetweenDate(req.params.symbol, req.query.type, req.query.start, req.query.end);
	if (stocks.length) {
		res.status(200);
		res.json(stocks);
	} else {
		res.sendStatus(404);
		// res.json({"message":"There are no trades in the given date range"});
	}
};

let getWhereStocksPriceFunc = async (req, res, next) => {
	console.log(req.params);
	console.log(req.query);
	let stocks = await controller.getWhereStocksPrice(req.params.symbol, req.query.start, req.query.end);
	stocks = stocks.map(function(doc) {
		doc.symbol = doc._id;
		delete doc._id;
		return doc;
	});
	if (stocks.length) {
		res.status(200);
		res.json(stocks[0]);
	} else {
		res.status(404);
		res.json({ "message": "There are no trades in the given date range" });
	}
};

router.get("/", async (req, res, next) => {
		const trades = await controller.get();
		res.status(403);
		res.json(trades);
	})
	.get("/users/:id", async (req, res, next) => {
		const trades = await controller.get(req.params.id);
		if(trades.length){
			res.status(200);
			res.json(trades);
		}else{
			res.sendStatus(404);
		}
	})
	.post("/", async (req, res, next) => {
		const postResp = await controller.addTrade(req.body);
		if (postResp) {
			const isCreationFailed = await controller.create(req.body);
			if (isCreationFailed) {
				res.sendStatus(400);
			} else {
				res.sendStatus(201);
			}
		} else {
			res.sendStatus(400);
		}
	})
	// .delete("/", deleteFunc);
	// .get("/stocks/:symbol/trades", getWhereStocksBetweenDateFunc)
	// .get("/stocks/:symbol/price", getWhereStocksPriceFunc)
	;

module.exports = { 
	router: router, 
	deleteFunc: deleteFunc, 
	getWhereStocksBetweenDateFunc: getWhereStocksBetweenDateFunc, 
	getWhereStocksPriceFunc: getWhereStocksPriceFunc 
};