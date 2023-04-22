// QuoteDetailsStore.js

import { makeAutoObservable } from "mobx";

class QuoteDetailsStore {
  quoteDetails = {};

  constructor() {
    makeAutoObservable(this);
  }

  setQuoteDetails(quoteDetails) {
    this.quoteDetails = quoteDetails;
  }
}

const quoteDetailsStore = new QuoteDetailsStore();
export default quoteDetailsStore;
