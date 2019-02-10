const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
	id: Number,
	name: String
});

const tradesSchema = new Schema({
	id: Number,
	type: String,
	user: userSchema,
	symbol: String,
	shares: {
	    type: Number,
	    min : 10,
	    max : 30
	},
	price: {
	    type: Number,
	    min : 130.42,
	    max : 195.65
	},
	timestamp: Date
});

const trades = mongoose.model("trades", tradesSchema);

module.exports = trades;