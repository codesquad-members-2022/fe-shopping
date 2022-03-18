import { $ } from "../util/util.js";

export default class {
  constructor({ searchFormArea }) {
    this.searchFormArea = searchFormArea;
  }

  findElementFromArea(selector) {
    return this.searchFormArea.querySelector(selector);
  }

  setElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
  }

  onFocusInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      $(".recent-search-area").style.display = "block";
    });
  }

  onEvent() {
    this.onFocusInput();
  }

  init() {
    this.setElements();
    this.onEvent();
  }
}
