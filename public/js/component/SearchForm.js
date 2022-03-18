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

  setElDisplayBlock(el) {
    el.style.display = "block";
  }

  setElDisplayNone(el) {
    el.style.display = "none";
  }

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      this.setElDisplayBlock($(".recent-search-area"));
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      this.setElDisplayNone($(".recent-search-area"));
    });
  }

  onFocusInput() {
    this.onFocusInInput();
    this.onFocusOutInput();
  }

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // 현재 검색 기능이 동작하지 않으므로 페이지 reload 동작하지 않도록 함
    });
  }

  onKeyUpInput() {
    this.inputEl.addEventListener("keyup", ({ target }) => {
      this.setElDisplayNone($(".recent-search-area"));
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onKeyUpInput();
    this.onFormSubmit();
  }

  init() {
    this.setElements();
    this.onEvent();
  }
}
