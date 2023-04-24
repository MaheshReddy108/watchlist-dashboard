import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";
var host = "ec2-34-228-186-204.compute-1.amazonaws.com";

class WatchlistStore {
  symbols = [];
  inputValue = "";
  isRowClicked = false;
  selectedSymbol = "";
  symbolsInfo = [];
  selectedUser  = "user1"

  constructor() {
    makeObservable(this, {
      symbols: observable,
      inputValue: observable,
      isRowClicked: observable,
      selectedSymbol: observable,
      symbolsInfo: observable,
      selectedUser:observable,
      setSelectedUser : action,
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
      const response = await axios.get(`http://${host}:3001/watchlist/${this.selectedUser}`);
      this.symbols = response.data;
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
      const response = await axios.get(`http://${host}:3001/allsymbols`);
      const symbols = response.data;
      this.symbolsInfo = symbols;
    } catch (error) {
      console.log(error);
      this.showSweetAlert(error.response.data.error);
    }
  };

  handleDelete = async symbol => {
    try {
      await axios.delete(`http://${host}:3001/watchlist/${this.selectedUser}/remove`, {
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
      await axios.post(`http://${host}:3001/watchlist/${this.selectedUser}/add`, {
        symbol: this.inputValue.toUpperCase()
      });
      this.fetchData();
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
      const response = await axios.get(
        `http://${host}:3001/symbol/${symbol}`
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
