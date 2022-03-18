import { $ } from "../util/util.js";
import storage from "../util/storage.js";

export default class {
  constructor({ searchFormArea, localStorageDataSize }) {
    this.searchFormArea = searchFormArea;
    this.localStorageDataSize = localStorageDataSize;
  }

  findElementFromArea(selector) {
    return this.searchFormArea.querySelector(selector);
  }

  setElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
  }

  isInputEmpty() {
    return this.inputEl.value.length === 0;
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

  sortDatasDesc(dataArr, key) {
    return dataArr.sort((a, b) => b[key] - a[key]);
  }

  setStoredDatasIdx(curInput) {
    const storedDatas = storage.getLocalStorage("recent-search")
      ? storage.getLocalStorage("recent-search")
      : [];

    let changedDatas = storedDatas.reduce((prev, cur) => {
      if (cur["data"] === curInput) return prev;
      const { no, data } = cur;
      return [...prev, { no: no + 1, data }];
    }, []);

    return changedDatas;
  }

  removeLeastUsedData(dataArr, sortKey) {
    return this.sortDatasDesc(dataArr, sortKey).slice(1);
  }

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // 현재 검색 기능이 동작하지 않으므로 페이지 reload 동작하지 않도록 함
      if (this.isInputEmpty()) return;

      const firstIdx = 0;
      const inputTxt = this.inputEl.value;
      const currentData = { no: firstIdx, data: inputTxt };
      const currentDataCnt = 1;
      this.clearInput();
      let storedDatas = this.setStoredDatasIdx(inputTxt);

      if (storedDatas.length > this.localStorageDataSize - currentDataCnt) {
        storedDatas = this.removeLeastUsedData(storedDatas, "no");
      }
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
