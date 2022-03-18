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

  setSearchFormElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
    this.recentSearchArea = this.findElementFromArea(".recent-search-area");
  }

  fillRecentSearchWords() {
    const storedDatas = storage.getLocalStorage("recent-search");
    const DataSortByAsc = this.sortDataAsc(storedDatas, "no");

    const recentSearchList = this.recentSearchArea.querySelector(".list");
    recentSearchList.innerHTML = this.createRecentSearchElements(DataSortByAsc);
  }

  createRecentSearchElements(data) {
    const recentSearchElTag = data.reduce((prev, cur) => {
      return (
        prev +
        `<li class="recent-search-item">
            <a href="#" class="link">${cur["data"]}</a>
        </li>`
      );
    }, "");

    return recentSearchElTag;
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
      this.setElDisplayBlock(this.recentSearchArea);
      this.fillRecentSearchWords();
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      this.setElDisplayNone(this.recentSearchArea);
    });
  }

  onFocusInput() {
    this.onFocusInInput();
    this.onFocusOutInput();
  }

  sortDataAsc(dataArr, key) {
    return dataArr.sort((a, b) => a[key] - b[key]);
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

  handleSubmitForm(e) {
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
  }

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => this.handleSubmitForm(e));
  }

  onKeyUpInput() {
    this.inputEl.addEventListener("keyup", ({ target }) => {
      this.setElDisplayNone(this.recentSearchArea);
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onKeyUpInput();
    this.onFormSubmit();
  }

  init() {
    this.setSearchFormElements();
    this.onEvent();
  }
}
