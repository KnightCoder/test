const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

const db = require('./db/index.js');

const publicConfig = require("./config/public");
const config = publicConfig[app.get('env')];

const trades = require('./api/trades/routes.js');
const stocks = require('./api/stocks/routes.js');

app.use(bodyParser.json());

mongoose.set("debug", true);

app.delete("/erase", trades.deleteFunc);

app.use('/trades', trades.router);
app.use('/stocks', stocks);

app.on("error", handleError);

(async function(){
	try {
		await db.connect();
		console.log("Connected to the DB");
		app.listen(config.port, '0.0.0.0', () => console.log(`Connected to the server on port ${config.port}!`));
	} catch (error) {
		console.log("Something went wrong while: Connected to the DB");
		console.log(error);
		app.emit("error", error, this);
	}
})();

function handleError(err, ctx) {
	let date = new Date();
	let errorMsg =
		"[" +
		date.toString() +
		"]:: \t" +
		"Internal Server Error occurred:: " +
		(err.name ? err.name + "\n" : "") +
		(err.message ? err.message + "\n" : "") +
		(err.stack ? err.stack + "\n" : "") +
		"\n" +
		"\n";

	if (console.error) {
		console.error(errorMsg);
	} else {
		console.log(errorMsg);
	}
};