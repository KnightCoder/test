# Trading Management Platform server

## Class diagram  
Following is a very high level rough class diagram.
![class diagram](https://github.com/KnightCoder/test/blob/master/class_diagram.png)

## API Specs

 1. **Erasing all the trades**   
    URL: http://localhost:3000/erase
    Method: DELETE
    Success response: HTTP response status code 200
    
    
 2. **Adding new trades**   
    URL: http://localhost:3000/trades
    Method: POST
    Success response: HTTP response status code 201
    Failure response: HTTP response status code 400
    Sample HTTP request body:
    [
        {
            "id": 2,
            "type": "buy",
            "user":
            {
                "id": 122,
                "name": "zyx"
            },
            "symbol": "ABC",
            "shares": 30,
            "price": 180,
            "timestamp": "2019-01-31T08:00:00.000Z"
        },
        {
            "id": 3,
            "type": "buy",
            "user":
            {
                "id": 1,
                "name": "aaa"
            },
            "symbol": "def",
            "shares": 25,
            "price": 142,
            "timestamp": "2019-02-01T08:20:00.000Z"
        },
        {
            "id": 1,
            "type": "sell",
            "user":
            {
                "id": 123,
                "name": "bbb"
            },
            "symbol": "def",
            "shares": 15,
            "price": 190,
            "timestamp": "2019-01-28T08:20:00.000Z"
        },
        {
            "id": 4,
            "type": "buy",
            "user":
            {
                "id": 123,
                "name": "bbb"
            },
            "symbol": "ghi",
            "shares": 30,
            "price": 144,
            "timestamp": "2019-02-02T08:20:00.000Z"
        },
        {
            "id": 5,
            "type": "sell",
            "user":
            {
                "id": 122,
                "name": "zyx"
            },
            "symbol": "ghi",
            "shares": 30,
            "price": 160,
            "timestamp": "2019-02-03T08:20:00.000Z"
        },
        {
            "id": 6,
            "type": "buy",
            "user":
            {
                "id": 1,
                "name": "aaa"
            },
            "symbol": "ghi",
            "shares": 10,
            "price": 130.42,
            "timestamp": "2019-02-03T08:20:00.000Z"
        }
    ]
    
 3. **Returning all the trades**  
    URL: http://localhost:3000/trades
    Method: GET
    Success response: HTTP response status code 200
    Resulting JSON will be sorted in ascending order of the trade ID.
    
 4. **Returning the trade records filtered by the user ID**  
    URL: http://localhost:3000/trades/users/{userID}
    Method: GET
    Success response: HTTP response status code 200
    Fail response: HTTP response status code 404
    Resulting JSON will be sorted in ascending order of the trade ID.
    Sample URL: http://localhost:3000/trades/users/122
    
 5. **Returning the trade records filtered by the stock symbol and trade
    type in the given date range**  
    URL: http://localhost:3000/stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}
    Method: GET
    Success response: HTTP response status code 200
    Fail response: HTTP response status code 404
    Resulting JSON will be sorted in ascending order of the trade ID.
    Sample URL: http://localhost:3000/stocks/ghi/trades?type=buy&start=2019-02-01T08:20:00.000Z&end=2019-02-10T08:20:00.000Z
    
 6. **Returning the highest and lowest price for the stock symbol in the
    given date range**  
    URL: http://localhost:3000/stocks/{stockSymbol}/price?start={startDate}&end={endDate}
    Method: GET
    Success response: HTTP response status code 200
    Fail response: HTTP response status code 404
    Resulting JSON will be sorted in ascending order of the trade ID.
    The response JSON will consist of the following three fields: 
	`symbol`: the symbol for the requested stock 
	`highest`: the highest price for the requested stock symbol in the given date range 
	`lowest`: the lowest price for the requested stock symbol in the given date range
    Sample URL: http://localhost:3000/stocks/ghi/price?start=2019-02-01T08:20:00.000Z&end=2019-02-10T08:20:00.000Z
    

## Instructions to install and build

Configurations:
To configure the server you might need to edit the config file placed at **\server\src\config\public.json** depending on the server environment. 

Install dependencies:
Install the following dependencies on your server:
 [node.js](https://nodejs.org/en/) 
 [Yarn](https://yarnpkg.com/en/) package manager
 [MongoDB](https://www.mongodb.com/)
 [Postman](https://www.getpostman.com/)
 
 Once the dependent Softwares are installed successfully. Go to the **\server** folder in command prompt using an administrator mode type the following:

    yarn install
There are a few ways how you may run the project, once all the dependencies are installed. These are:

 1. Using node
 For this you will simply have to open your command prompt from the 
 **\server** folder and run the following command
 

    node src/index.js

 3. Using npm run scripts
 For this you will simply have to open your command prompt from the 
 **\server** folder and run the following command

    npm run start

 3. Using nodemon
 For this you will simply have to open your command prompt from the 
 **\server** folder and run the following command
 

    nodemon

 4. Using [PM2](http://pm2.keymetrics.io/) 
 First you will have to install and configure PM2 on your server. Configure "**src/index.js**" as the main executable file. Once PM2 is installed and configured according to your server platform, the server should start running.
 This method is preferred for production environment. All the methods mentioned above are suitable for development or testing environment. 

 
## Database

In this project we are using MongoDB as the database. 
For this small project we will create a database called "**TradingManagementPlatform**" and a collection called "**trades**" in it. 
The schema of this collection will be: 

    id: Number,
    type: String,
    user: {
		id: Number,
		name: String
	},
	symbol: String,
    shares: Number,
    price: Number,
    timestamp: Date

Sample data that we may use to fill this database now or later can be: 

    [
        {
            "id": 2,
            "type": "buy",
            "user":
            {
                "id": 122,
                "name": "zyx"
            },
            "symbol": "ABC",
            "shares": 30,
            "price": 180,
            "timestamp": "2019-01-31T08:00:00.000Z"
        },
        {
            "id": 3,
            "type": "buy",
            "user":
            {
                "id": 1,
                "name": "aaa"
            },
            "symbol": "def",
            "shares": 25,
            "price": 142,
            "timestamp": "2019-02-01T08:20:00.000Z"
        },
        {
            "id": 1,
            "type": "sell",
            "user":
            {
                "id": 123,
                "name": "bbb"
            },
            "symbol": "def",
            "shares": 15,
            "price": 190,
            "timestamp": "2019-01-28T08:20:00.000Z"
        },
        {
            "id": 4,
            "type": "buy",
            "user":
            {
                "id": 123,
                "name": "bbb"
            },
            "symbol": "ghi",
            "shares": 30,
            "price": 144,
            "timestamp": "2019-02-02T08:20:00.000Z"
        },
        {
            "id": 5,
            "type": "sell",
            "user":
            {
                "id": 122,
                "name": "zyx"
            },
            "symbol": "ghi",
            "shares": 30,
            "price": 160,
            "timestamp": "2019-02-03T08:20:00.000Z"
        },
        {
            "id": 6,
            "type": "buy",
            "user":
            {
                "id": 1,
                "name": "aaa"
            },
            "symbol": "ghi",
            "shares": 10,
            "price": 130.42,
            "timestamp": "2019-02-03T08:20:00.000Z"
        }
    ]
