# Watchlist Dashboard
A simple & customizable dashboard to manage your stock watchlist items.

## Description
The Watchlist Dashboard is a web application that allows you to manage and track Stock symbols in your watchlist. You can add, delete and update(refresh)any symbol, when you click on a specific row, the quotedetails will open up for a symbol.

# Table of Contents
- [Installation](#installation)
- [Features](#features)
   - [APIs](#APIs)
   - [Components](#Components)
- [Tests](#Tests)
- [Deployment](#Deployment)
 

## Installation <a name = "installation"></a>


1. Clone the repository from GitHub: ```https://github.com/MaheshReddy108/watchlist-dashboard.git``` 
2. Navigate to ```washlist-dashboard/server``` directory in Terminal
   - run ```npm install``` to install all the dependancies  
   - ```npm start``` to start the backend Node server.
3. Navigate to ```washlist-dashboard/client``` directory
   -  run ```npm install``` to install all the dependancies
   -  ```npm start``` to start the frontend react server.
4. Now the UI will be launched in the localhost port 3000, backened node will be running in 3001.


## Features <a name = "features"></a>
Open your browser and go to http://localhost:3000/. 
1. On the Top left **User** can be changed in the dropdown
2. To add a new symbol to your watchlist, enter the symbol in the input field and click the **Add** button. (Available symbols are shown below). 
3. To delete a symbol from watchlist, click the red *delete** icon button toward the right side of every row.  
4. To update the symbol data (if it was changed in the backend), click on green color **update** button.
5. To view the Quote details of a specific symbol, click on the respective row.


## Tests <a name = "Tests"></a>
* Tests are available in the ```__tests__``` directory inside ```client/src```


