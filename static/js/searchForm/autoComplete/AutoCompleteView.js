import { dom } from "../../utils/dom.js";

export default class AutoCompleteView {
  constructor() {
    this.bound = {};
    this.autoCompleteEl = dom.select(".searchForm__autoComplete");
    this.listEl = dom.select(".searchForm__autoComplete-list");
    this.className = {
      show: "show",
      hidden: "hidden",
    };
  }

  createItem(value) {
    return `<li class="searchForm__autoComplete-item">${value}</li>`;
  }

  createItems(autoCompleteWords) {
    return autoCompleteWords.reduce((acc, word) => acc + this.createItem(word), "");
  }

  async renderAutoComplete(category, inputValue) {
    const words = await this.bound.requestAutoCompleteWords(category, inputValue);
    dom.initEl(this.listEl);
    this.listEl.insertAdjacentHTML("beforeend", this.createItems(words));
    this.showAutoComplete();
  }

  showAutoComplete() {
    this.autoCompleteEl.classList.replace(this.className.hidden, this.className.show);
  }

  hideAutoComplete() {
    this.autoCompleteEl.classList.replace(this.className.show, this.className.hidden);
  }
}
