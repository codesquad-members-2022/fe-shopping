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

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      $(".recent-search-area").style.display = "block";
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      $(".recent-search-area").style.display = "none";
    });
  }

  onFocusInput() {
    this.onFocusInInput();
    this.onFocusOutInput();
  }

  onEvent() {
    this.onFocusInput();
  }

  init() {
    this.setElements();
    this.onEvent();
  }
}
