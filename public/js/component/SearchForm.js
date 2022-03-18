import { $ } from "../util/util.js";
import storage from "../util/storage.js";

export default class {
  constructor({ searchFormArea, localStorageDataSize }) {
    this.searchFormArea = searchFormArea;
    this.localStorageDataSize = this.localStorageDataSize;
  }

  findElementFromArea(selector) {
    return this.searchFormArea.querySelector(selector);
  }

  setElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
  }

  clearInput() {
    this.inputEl.value = "";
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

  setStoredDatasIdx(curInput) {
    const storedData = storage.getLocalStorage("recent-search")
      ? storage.getLocalStorage("recent-search")
      : [];

    const changedData = storedData.reduce((prev, cur) => {
      if (cur["data"] === curInput) return prev;
      const { no, data } = cur;
      return [...prev, { no: no + 1, data }];
    }, []);

    return changedData;
  }

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // 현재 검색 기능이 동작하지 않으므로 페이지 reload 동작하지 않도록 함
      const firstIdx = 0;
      const inputTxt = this.inputEl.value;
      const currentData = { no: firstIdx, data: inputTxt };
      this.clearInput();
      const storedDatas = this.setStoredDatasIdx(inputTxt);
      storage.setLocalStorage("recent-search", [...storedDatas, currentData]);
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
