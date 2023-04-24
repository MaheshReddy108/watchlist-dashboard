import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Watchlist from "../components/WatchList.js";

describe("Watchlist component", () => {
  test("renders Watchlist Dashboard header", () => {
    render(<Watchlist />);
    const headerElement = screen.getByText(/Watchlist Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders symbols table", () => {
    render(<Watchlist />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });

  test("renders add symbol input field", () => {
    render(<Watchlist />);
    const inputElement = screen.getByPlaceholderText(/Enter Symbol/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("renders available symbols", () => {
    render(<Watchlist />);
    const availableSymbolsElement = screen.getByText(/Available Symbols:/i);
    expect(availableSymbolsElement).toBeInTheDocument();
  });

  test("clicking on a symbol in the table opens the quote details", () => {
    render(<Watchlist />);
    const tableElement = screen.getByRole("table");
    const symbolLinkElement = tableElement.querySelector("a");
    fireEvent.click(symbolLinkElement);
    const quoteDetailsElement = screen.getByText(/Quote Details:/i);
    expect(quoteDetailsElement).toBeInTheDocument();
  });

  test("adding a symbol updates the table", () => {
    render(<Watchlist />);
    const inputElement = screen.getByPlaceholderText(/Enter Symbol/i);
    const addButtonElement = screen.getByText(/Add/i);
    const symbolToAdd = "AAPL";
    fireEvent.change(inputElement, { target: { value: symbolToAdd } });
    fireEvent.click(addButtonElement);
    const symbolLinkElement = screen.getByText(symbolToAdd);
    expect(symbolLinkElement).toBeInTheDocument();
  });

  test("calls setSelectedUser when user is selected", () => {
    render(<Watchlist />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "user2" } });
    expect(select.value).toBe("user2");
    expect(watchlistStore.setSelectedUser).toHaveBeenCalledWith("user2");
  });

  test("clicking the update button for a symbol calls handleUpdate", () => {
    const mockHandleUpdate = jest.fn();
    watchlistStore.handleUpdate = mockHandleUpdate;

    const { getByRole } = render(<Watchlist />);
    const symbol = "AAPL";
    const updateButton = getByRole("button", {
      name: /update/i,
      exact: false,
      hidden: false,
      label: new RegExp(symbol, "i")
    });

    fireEvent.click(updateButton);

    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
    expect(mockHandleUpdate).toHaveBeenCalledWith(symbol);
  });

  test("deleting a symbol updates the table", () => {
    render(<Watchlist />);
    const tableElement = screen.getByRole("table");
    const deleteButtonElement = tableElement.querySelector(
      "button[aria-label='delete']"
    );
    fireEvent.click(deleteButtonElement);
    const deletedSymbolLinkElement = screen.queryByText(/AAPL/i);
    expect(deletedSymbolLinkElement).not.toBeInTheDocument();
  });
});
