import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteDetails = ({ selectedSymbol }) => {
  const [quoteDetails, setQuoteDetails] = useState({});

  useEffect(() => {
    if (selectedSymbol) {
      axios
        .get(`https://your-api-url.com/quotes/${selectedSymbol}`)
        .then((response) => {
          setQuoteDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedSymbol]);

  return (
    <div>
      {selectedSymbol ? (
        <div>
          <h2>Quote Details for {selectedSymbol}</h2>
          <p>Bid: {quoteDetails.bid}</p>
          <p>Ask: {quoteDetails.ask}</p>
          <p>Bid Size: {quoteDetails.bidSize}</p>
          <p>Ask Size: {quoteDetails.askSize}</p>
          <p>Volume: {quoteDetails.volume}</p>
          {/* Add additional fields as necessary */}
        </div>
      ) : (
        <div>Please select a symbol from the watchlist.</div>
      )}
    </div>
  );
};

export default QuoteDetails;
