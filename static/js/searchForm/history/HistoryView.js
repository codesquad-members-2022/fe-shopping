import { dom } from "../../utils/dom.js";

export default class HistoryView {
  constructor() {
    this.bound = {};
    this.historyEl = dom.select(".searchForm__history");
    this.listEl = dom.select(".searchForm__history-list");
    this.buttonClearEl = dom.select(".searchForm__history-button--clear");
  }

  addHandler() {
    this.buttonClearEl.addEventListener("mousedown", () => this.bound.clearHistory());
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
}
