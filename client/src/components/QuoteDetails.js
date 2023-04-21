import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse } from "antd";
import "./QuoteDetails.css";


const QuoteDetails = ({ selectedSymbol }) => {
  const [quoteDetails, setQuoteDetails] = useState({});

  useEffect(() => {
    if (selectedSymbol) {
      axios
        .get(`http://localhost:3001/symbol/${selectedSymbol}`)
        .then(response => {
          console.log("mahesh", response);

          setQuoteDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedSymbol]);

  return (
    <div>
      {selectedSymbol ? (
        <Collapse defaultActiveKey={["1"] }>
          <Collapse.Panel 
          className="quote-details-panel"
            style={{
              backgroundColor: "purple",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px"
            }}
            header={<span style={{color: "white"}}>{`Quote Details for ${selectedSymbol}`}</span>}
            key="1"
          >
            <span >
              Bid: {quoteDetails.bid} &nbsp; Ask: {quoteDetails.ask} &nbsp; Bid
              Size: {quoteDetails.bidSize} &nbsp; Ask Size:{" "}
              {quoteDetails.askSize} &nbsp; Volume: {quoteDetails.volume} &nbsp;
              Quote Details: {quoteDetails.quoteDetails}
            </span>
          </Collapse.Panel>
        </Collapse>
      ) : (
        <div >Please select a symbol from the watchlist. </div>
      )}
    </div>
  );
};

export default QuoteDetails;
