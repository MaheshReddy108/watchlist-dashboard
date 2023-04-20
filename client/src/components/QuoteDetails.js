import React, { useState, useEffect } from "react";
import axios from "axios";

function QuoteDetails(props) {
  const { symbol, handleRemoveSymbol } = props;

  const [quoteDetails, setQuoteDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/getquotedetails/${symbol}`);
        setQuoteDetails(response.data);
      } catch (error) {
        setErrorMessage("Error fetching quote details.");
      }
      setIsLoading(false);
    };
    fetchQuoteDetails();
  }, [symbol]);

  return (
    <div className="quote-details">
      <div className="quote-details-header">
        <h2>{symbol}</h2>
        <button type="button" onClick={() => handleRemoveSymbol(symbol)}>
          Remove Symbol
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Open</td>
              <td>{quoteDetails.open}</td>
            </tr>
            <tr>
              <td>High</td>
              <td>{quoteDetails.high}</td>
            </tr>
            <tr>
              <td>Low</td>
              <td>{quoteDetails.low}</td>
            </tr>
            <tr>
              <td>Close</td>
              <td>{quoteDetails.close}</td>
            </tr>
            <tr>
              <td>Volume</td>
              <td>{quoteDetails.volume}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QuoteDetails;
