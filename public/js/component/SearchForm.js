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

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // 현재 검색 기능이 동작하지 않으므로 페이지 reload 동작하지 않도록 함
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onFormSubmit();
  }

  init() {
    this.setElements();
    this.onEvent();
  }
}
