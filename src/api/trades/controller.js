const _ = require("underscore");
const trades = require("./model");

exports.get = async (user) => {
	let tradesFound;
	if (user) {
		tradesFound = await trades.find({
			"user.id": Number(user)
		}, { "_id": false, "__v": false }).sort({ id: 'asc' }).lean();
	} else {
		tradesFound = await trades.find({}, { "_id": false, "__v": false }).sort({ id: 'asc' }).lean();
	}
	return tradesFound;
};

exports.create = async (data) => {
	let isCreationFailed = false;
	const tradesPromise = trades.insertMany(data);
	await tradesPromise.then(function() {
		isCreationFailed = false;
	}, function(err) {
		if (err) {
			isCreationFailed = true;
		}
	});
	return isCreationFailed;
};

exports.addTrade = async (data) => {
	let ids = [];
	if(data instanceof Array){
		ids = _.pluck(data,"id");
	}else{
		ids = [data.id];
	}
	let dupIDsFoundCnt = await trades.find({ id: {$in:ids} }).count();
	if (dupIDsFoundCnt>0) {
		return false;
	} else {
		return true;
	}
};

exports.delete = async () => {
	return await trades.remove({});
};

exports.getWhereStocksBetweenDate = async (symbol, type, start, end) => {
	let tradesFound = await trades.find({
		symbol: symbol,
		type: type,
		timestamp: {
			$gt: start,
			$lt: end
		}
	}, { "_id": false, "__v": false }).sort({ id: 'asc' }).lean();

	return tradesFound;
};

exports.getWhereStocksPrice = async (symbol, start, end) => {
	let tradesFound = await trades.aggregate([{
			$match: {
				symbol: symbol,
				timestamp: {
					$gt: new Date(start),
					$lt: new Date(end)
				}
			}
		},
		{
			$group: {
				_id: "$symbol",
				lowest: { $min: "$price" },
				highest: { $max: "$price" }
			}
		}
	]);

	return tradesFound;
};