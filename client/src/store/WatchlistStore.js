import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

class WatchlistStore {
  symbols = [];
  inputValue = "";
  isRowClicked = false;
  selectedSymbol = "";
  symbolsInfo = [];

  constructor() {
    makeObservable(this, {
      symbols: observable,
      inputValue: observable,
      isRowClicked: observable,
      selectedSymbol: observable,
      symbolsInfo: observable,
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
      const response = await axios.get("http://localhost:3001/watchlist/user1");
      this.symbols = response.data;
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
    }
  };

  setInputValue = async value => {
    this.inputValue = value;
  };
  fetchSymbolsInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allsymbols");
      const symbols = response.data;
      this.symbolsInfo = symbols;
    } catch (error) {
      console.log(error);
      this.showSweetAlert(error.response.data.error);
    }
  };

  handleDelete = async symbol => {
    try {
      await axios.delete("http://localhost:3001/watchlist/user1/remove", {
        data: {
          symbol
        }
      });
      this.fetchData();
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
      await axios.post("http://localhost:3001/watchlist/user1/add", {
        symbol: this.inputValue.toUpperCase()
      });
      this.fetchData();
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
      const response = await axios.get(
        `http://localhost:3001/symbol/${symbol}`
      );
      const updatedData = response.data;
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
      this.symbols = newData;
    } catch (error) {
      this.showSweetAlert(error.response.data.error);
    }
  };

  showSweetAlert = message => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message
    });
  };
}

const watchlistStore = new WatchlistStore();
export default watchlistStore;
