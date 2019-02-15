const express = require('express');
const app = express();
const mongoose = require("mongoose");

const publicConfig = require("../config/public");
const config = publicConfig[app.get('env')];

const url = config.db.url;
const db = config.db.name;

const connect = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect(`${url}/${db}`);
		
		const connection = mongoose.connection;
		connection.on("error", reject);
		connection.on("open", resolve);
		connection.on("reconnectFailed", reject);
	});
};

module.exports = {connect: connect};