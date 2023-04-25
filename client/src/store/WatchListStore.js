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

  fetchData = () => {
    return axios.get(`http://${host}:3001/watchlist/${this.selectedUser}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      this.symbols = response.data;
    })
    .catch(error => {
      this.showSweetAlert(error.response.data.error);
    });
  };
  
  setSelectedUser = user => {
    this.selectedUser = user;
    return Promise.resolve();
  };
  
  setInputValue = value => {
    this.inputValue = value;
    return Promise.resolve();
  };
  
  fetchSymbolsInfo = () => {
    return axios.get(`http://${host}:3001/allsymbols`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      this.symbolsInfo = response.data;
    })
    .catch(error => {
      console.log(error);
      this.showSweetAlert(error.response.data.error);
    });
  };
  
  handleDelete = symbol => {
    return axios.delete(`http://${host}:3001/watchlist/${this.selectedUser}/remove`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: { symbol }
    })
    .then(() => {
      setTimeout(() => {
        return this.fetchData();
      }, 1000);
      this.showSweetAlert(
        `Symbol "${symbol}" is being deleted successfully.`,
        "success",
        "Success!"
      );
      this.inputValue = "";
    })
    .catch(error => {
      this.showSweetAlert(error.response.data.error);
    });
  };
  
  handleAdd = () => {
    if (this.inputValue.trim() === "") {
      this.showSweetAlert("Enter a Valid Symbol");
      return Promise.resolve();
    }
    return axios.post(`http://${host}:3001/watchlist/${this.selectedUser}/add`, {
      symbol: this.inputValue.toUpperCase()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      setTimeout(() => {
        this.fetchData();
      }, 1000);
      this.showSweetAlert(
        `Symbol "${this.inputValue.toUpperCase()}" is being added successfully.`,
        "success",
        "Success!"
      );
      this.inputValue = "";
    })
    .catch(error => {
      this.showSweetAlert(error.response.data.error);
      this.inputValue = "";
    });
  };
  
  handleRowClick = symbol => {
    this.isRowClicked = true;
    this.selectedSymbol = symbol;
  };
  
  handleUpdate = symbol => {
    return axios.get(`http://${host}:3001/symbol/${symbol}`)
    .then(response => {
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
        `Symbol "${symbol}" is being updated successfully.`,
        "success",
        "Success!"
      );
      this.symbols = newData;
    })
    .catch(error => {
      this.showSweetAlert(error.response.data.error);
    });
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
