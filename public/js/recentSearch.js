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

  saveHistory() {
    this.storage.setItem("search", JSON.stringify(this.historyList));
  }

  addSearchList() {
    if (this.storage.getItem("search") !== null) {
      const parsedList = JSON.parse(this.storage.getItem("search"));
      this.historyList = parsedList;
      parsedList.forEach((el) => this.saveSearchHistory(el));
    }
  }

  deleteSearch(event) {
    const deleteTarget = event.target.parentElement;
    deleteTarget.remove();
    this.historyList = this.historyList.filter(
      (search) => search.id !== parseInt(deleteTarget.id)
    );
    this.saveHistory();
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
    deleteBtn.addEventListener("click", this.deleteSearch.bind(this));
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

  showInputSearch() {
    searchList.style.visibility = "visible";
  }

  init() {
    searchInputForm.addEventListener(
      "submit",
      this.inputSubmitHandler.bind(this)
    );
    searchInput.addEventListener("focus", this.showInputSearch);
    this.addSearchList();
  }
}
