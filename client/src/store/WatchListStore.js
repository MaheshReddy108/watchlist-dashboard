import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
const { host } = require("../config");

class WatchlistStore {
  symbols = [];
  inputValue = "";
  isRowClicked = false;
  selectedSymbol = "";
  symbolsInfo = [];
  selectedUser = "user1";

  constructor() {
    makeObservable(this, {
      symbols: observable,
      inputValue: observable,
      isRowClicked: observable,
      selectedSymbol: observable,
      symbolsInfo: observable,
      selectedUser: observable,
      setSelectedUser: action,
      setInputValue: action,
      fetchData: action,
      fetchSymbolsInfo: action,
      handleDelete: action,
      handleAdd: action,
      handleRowClick: action,
      handleUpdate: action
    });
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `http://${host}:3001/watchlist/${this.selectedUser}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      this.symbols = data;
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
    }
  };

  setSelectedUser = async user => {
    this.selectedUser = user;
  };

  setInputValue = async value => {
    this.inputValue = value;
  };

  fetchSymbolsInfo = async () => {
    try {
      const response = await fetch(`http://${host}:3001/allsymbols`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const symbols = await response.json();
      this.symbolsInfo = symbols;
    } catch (error) {
      console.log(error);
      this.showSweetAlert(error.response.data.error);
    }
  };

  handleDelete = async symbol => {
    try {
      const response = await fetch(
        `http://${host}:3001/watchlist/${this.selectedUser}/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ symbol })
        }
      );
      await this.fetchData();
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
    }
  };

  handleAdd = async () => {
    if (this.inputValue.trim() === "") {
      this.showSweetAlert("Enter a Valid Symbol");
      return;
    }
    try {
      const response = await fetch(
        `http://${host}:3001/watchlist/${this.selectedUser}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ symbol: this.inputValue.toUpperCase() })
        }
      );
      await this.fetchData();
      this.showSweetAlert(
        `Symbol "${this.inputValue.toUpperCase()}" has been added successfully.`,
        "success",
        "Success!"
      );
      this.inputValue = "";
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
      this.inputValue = "";
    }
  };

  handleRowClick = symbol => {
    this.isRowClicked = true;
    this.selectedSymbol = symbol;
  };

  handleUpdate = async symbol => {
    try {
      const response = await fetch(`http://${host}:3001/symbol/${symbol}`);
      const updatedData = await response.json();
      const newData = Object.keys(this.symbols).map(key => {
        if (key === symbol) {
          const updatedRow = {
            ...this.symbols[key],
            ...updatedData
          };
          return {
            key,
            symbol: key,
            ...updatedRow
          };
        } else {
          return {
            key,
            symbol: key,
            ...this.symbols[key]
          };
        }
      });
      this.showSweetAlert(
        `Symbol "${symbol}" has been updated successfully.`,
        "success",
        "Success!"
      );
      this.symbols = newData;
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
    }
  };

  showSweetAlert = (message, icon = "error", title = "Oops...") => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  };
}

const watchlistStore = new WatchlistStore();
export default watchlistStore;
