# Watchlist Dashboard
A simple and customizable dashboard to manage your stock watchlist items.

## Description
The Watchlist Dashboard is a web application that allows you to manage and track stock symbols in your watchlist. You can add, delete, and update (refresh) any symbol, and when you click on a specific row, the quote details will open up for that symbol.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
  - [APIs](#apis)
  - [Components](#components)
  - [MobX State Management](#mobx-state-management)
- [Tests](#tests)
- [Deployment](#deployment)

## Installation <a name="installation"></a>

1. Clone the repository from GitHub: `https://github.com/MaheshReddy108/watchlist-dashboard.git`
2. Navigate to the `washlist-dashboard/server` directory in Terminal:
   - Run `npm install` to install all the dependencies.
   - Run `npm start` to start the backend Node server.
3. Navigate to the `washlist-dashboard/client` directory:
   - Run `npm install` to install all the dependencies.
   - Run `npm start` to start the frontend React server.
4. The UI will be launched in the localhost port 3000, and the backend Node server will be running on port 3001.

## Features <a name="features"></a>

1. On the top left, the **User** can be changed in the dropdown.
2. To add a new symbol to your watchlist, enter the symbol in the input field and click the **Add** button. (Available symbols are shown below.)
3. To delete a symbol from the watchlist, click the red **Delete** button towards the right side of every row.
4. To update the symbol data (if it was changed in the backend), click on the green **Update** button.
5. To view the quote details of a specific symbol, click on the respective row.

### APIs <a name="apis"></a>
- `getSymbolData`: Retrieves the quote details for a specific stock symbol.
- `getAllSymbols`: Retrieves a list of all available stock symbols.
- `getWatchlistData`: Retrieves the current watchlist data, including all the stock symbols and their respective quote details.
- `addToWatchlist`: Adds a new stock symbol to the watchlist.
- `removeFromWatchlist`: Removes a stock symbol from the watchlist.

### Components
- **WatchList.js** - The component that renders the watchlist table and handles adding, deleting and updating symbols.
- **QuoteDetails.js** - The component that renders the quote details popup for a specific symbol.
- **WatchList.css** and **QuoteDetails.css** - The CSS files for the WatchList and QuoteDetails components.

## MobX State Management <a name = "mobx-state-management"></a>
The Watchlist Dashboard uses MobX for state management. MobX is a simple, scalable and battle-tested state management library that makes it easy to manage complex application state. 

The state of the application is managed in the ```client/src/store``` directory, which contains the following files:
- ```watchlistStore.js```: This file contains the state and actions for managing the watchlist data.
- ```quoteDetailsStore.js```: This file contains the state and actions for managing the quote details data.


## Tests <a name = "Tests"></a>
- Tests are available in the ```__tests__``` directory inside ```client/src```.
- The tests are written using React Testing Library and cover different edge cases.
- The tests ensure error handling and empty state handling for both the frontend and backend.

## Deployment <a name = "Deployment"></a>
The Watchlist Dashboard is deployed to an AWS EC2 instance and can be accessed via this URL: URL: [http://ec2-34-228-186-204.compute-1.amazonaws.com:3000/](http://ec2-34-228-186-204.compute-1.amazonaws.com:3000/).

The server is currently paused due to billing issues, If you would like to view the watchlist dashboard application hosted on AWS, please let me know so that I can resume the server.

