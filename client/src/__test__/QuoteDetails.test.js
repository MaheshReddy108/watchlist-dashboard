import React from "react";
import axios from "axios";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import QuoteDetails from "../components/QuoteDetails.js";
import quoteDetailsStore from "../store/QuoteDetailsStore";

jest.mock("axios");

describe("QuoteDetails component", () => {
  beforeEach(() => {
    quoteDetailsStore.setQuoteDetails({});
  });

  test("renders the 'Please select a symbol' message when no symbol is selected", () => {
    const { getByText } = render(<QuoteDetails selectedSymbol={null} />);
    expect(getByText("Please select a symbol from the watchlist.")).toBeInTheDocument();
  });

  test("renders the 'Quote Details' panel with correct header when symbol is selected", async () => {
    const mockResponse = {
      data: {
        bid: 100,
        ask: 110,
        bidSize: 50,
        askSize: 60,
        volume: 500,
        quoteDetails: "Some details"
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const { getByText } = render(<QuoteDetails selectedSymbol="AAPL" />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const headerText = getByText("Quote Details for AAPL");
    expect(headerText).toBeInTheDocument();
    expect(headerText).toHaveStyle("color: white");
  });

  test("displays the quote details when symbol is selected and data is fetched successfully", async () => {
    const mockResponse = {
      data: {
        bid: 100,
        ask: 110,
        bidSize: 50,
        askSize: 60,
        volume: 500,
        quoteDetails: "Some details"
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const { getByText } = render(<QuoteDetails selectedSymbol="AAPL" />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText("Bid: 100")).toBeInTheDocument();
    expect(getByText("Ask: 110")).toBeInTheDocument();
    expect(getByText("Bid Size: 50")).toBeInTheDocument();
    expect(getByText("Ask Size: 60")).toBeInTheDocument();
    expect(getByText("Volume: 500")).toBeInTheDocument();
    expect(getByText("Quote Details: Some details")).toBeInTheDocument();
  });

  test("displays error message when symbol is selected but data fetching fails", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching data"));

    const { getByText } = render(<QuoteDetails selectedSymbol="AAPL" />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText("Error fetching data")).toBeInTheDocument();
  });
});
