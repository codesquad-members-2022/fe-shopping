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

  saveSearchHistory(searchInputValue) {
    const { id, searchContent } = searchInputValue;
    const addSearchHistory = document.createElement("li");
    const deleteBtn = document.createElement("span");
    addSearchHistory.id = id;
    addSearchHistory.innerText = searchContent;
    deleteBtn.innerText = "x";
    addSearchHistory.appendChild(deleteBtn);
    searchListHistory.appendChild(addSearchHistory);
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
