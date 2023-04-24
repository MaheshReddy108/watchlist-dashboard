
import React, { useEffect } from "react";
import axios from "axios";
import { Collapse } from "antd";
import { observer } from "mobx-react-lite";
import quoteDetailsStore from "../store/QuoteDetailsStore";
import "./QuoteDetails.css";
var host = "ec2-34-228-186-204.compute-1.amazonaws.com";

const QuoteDetails = ({ selectedSymbol }) => {
  useEffect(() => {
    if (selectedSymbol) {
      axios
        .get(`http://${host}:3001/symbol/${selectedSymbol}`)
        .then(response => {
          quoteDetailsStore.setQuoteDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedSymbol]);

  return (
    <div>
      {selectedSymbol ? (
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel
            className="quote-details-panel"
            style={{
              backgroundColor: "purple",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px"
            }}
            header={
              <span
                style={{ color: "white" }}
              >{`Quote Details for ${selectedSymbol}`}</span>
            }
            key="1"
          >
            <span>
              Bid: {quoteDetailsStore.quoteDetails.bid} &nbsp; Ask:{" "}
              {quoteDetailsStore.quoteDetails.ask} &nbsp; Bid Size:{" "}
              {quoteDetailsStore.quoteDetails.bidSize} &nbsp; Ask Size:{" "}
              {quoteDetailsStore.quoteDetails.askSize} &nbsp; Volume:{" "}
              {quoteDetailsStore.quoteDetails.volume}
              <br />
              Quote Details: {quoteDetailsStore.quoteDetails.quoteDetails}
            </span>
          </Collapse.Panel>
        </Collapse>
      ) : (
        <div>Please select a symbol from the watchlist. </div>
      )}
    </div>
  );
};

export default observer(QuoteDetails);
