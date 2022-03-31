import { dom } from "../../utils/dom.js";

export default class HistoryView {
  constructor({ historyEl, historyListEl, clearButtonEl }) {
    this.bound = {};
    this.historyEl = historyEl;
    this.listEl = historyListEl;
    this.clearButtonEl = clearButtonEl;
    this.className = {
      show: "show",
      hidden: "hidden",
    };
  }

  addHandler() {
    this.clearButtonEl.addEventListener("mousedown", () => this.bound.clearHistory());
  }

  createItem(value) {
    return `<li class="searchForm__history-item">${value}</li>`;
  }

  createItems(history) {
    return history.reduce((acc, value) => this.createItem(value) + acc, "");
  }

  renderHistory(history) {
    dom.initEl(this.listEl);
    this.listEl.insertAdjacentHTML("beforeend", this.createItems(history));
  }

  showHistory() {
    this.historyEl.classList.replace(this.className.hidden, this.className.show);
  }

  hideHistory() {
    this.historyEl.classList.replace(this.className.show, this.className.hidden);
  }
}
