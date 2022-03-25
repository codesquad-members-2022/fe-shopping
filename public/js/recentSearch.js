import {
  searchList,
  searchInputForm,
  searchInput,
  searchListHistory,
} from "./util/querySelector.js";

export class HistorySearch {
  constructor() {
    this.historyList = new Array();
    this.storage = localStorage;
  }

  inputSubmitHandler(event) {
    event.preventDefault();
    const searchInputValue = searchInput.value;
    searchInput.value = "";
    const searchObj = {
      id: Date.now(),
      searchContent: searchInputValue,
    };
    this.historyList.push(searchObj);
    this.saveSearchHistory(searchObj);
    this.saveHistory();
  }
}
