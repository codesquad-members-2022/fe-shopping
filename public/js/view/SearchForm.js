import storage from "../util/storage.js";
import constants from "../common/constants.js";
import { $, $$, debounce, fetchData } from "../util/util.js";

export default class {
  constructor({ searchFormArea, localStorageDataSize, recentSearchMsg }) {
    this.searchFormArea = searchFormArea;
    this.localStorageDataSize = localStorageDataSize;
    this.recentSearchMsg = recentSearchMsg;
    this.curSelectedIdx = -1;
    this.itemsCount;
  }

  findElementFromArea(selector) {
    return this.searchFormArea.querySelector(selector);
  }

  setSearchFormElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
    this.searchAreaDropDown = this.findElementFromArea(".search-area-dropdown");
  }

  // TODO: 코드가 너무 비슷함, 수정하기
  fillRecentSearchWords() {
    const recentSearchList = this.searchAreaDropDown.querySelector(".list");
    const storedDatas = storage.getLocalStorage("recent-search");
    if (!storedDatas) {
      recentSearchList.innerHTML = "";
      return;
    }
    const DataSortByAsc = this.sortDataAsc(storedDatas, "no");
    this.setSearchItemsCount(DataSortByAsc);
    recentSearchList.innerHTML = this.createRecentSearchElements(DataSortByAsc);
  }

  fillRecommendSearchWords({ suggestions }) {
    if (!suggestions) return;
    const recentSearchList = this.searchAreaDropDown.querySelector(".list");
    const suggestionsData = suggestions.map((data) => data.value);
    this.setSearchItemsCount(suggestionsData);
    recentSearchList.innerHTML =
      this.createRecommendSearchElements(suggestionsData);
  }

  setSearchItemsCount(data) {
    this.itemsCount = data.length;
  }

  createRecentSearchElements(data) {
    const recentSearchElTag = data.reduce((prev, cur, idx) => {
      return (
        prev +
        `<li class="recent-search-item">
            <a href="#" class="link" data-idx=${idx}>${cur["recentSearchWord"]}</a>
        </li>`
      );
    }, "");

    return recentSearchElTag;
  }

  createRecommendSearchElements(data) {
    const recommendSearchTag = data.reduce((prev, cur, idx) => {
      return (
        prev +
        `
        <li class="recommend-search-item">
          <a href="#" class="link" data-idx=${idx}>${cur}</a>
        </li>
      `
      );
    }, "");

    return recommendSearchTag;
  }

  isInputEmpty() {
    return this.inputEl.value.length === 0;
  }

  clearInput() {
    this.inputEl.value = "";
  }

  setDisplayBlock(el) {
    el.style.display = "block";
  }

  setDisplayNone(el) {
    el.style.display = "none";
  }

  setSearchAreaDropDownInner(HTMLtag) {
    this.searchAreaDropDown.innerHTML = HTMLtag;
  }

  createRecentSearchArea() {
    const recentSearchAreaTag = `
      <div class="inner">
        <p class="title">최근 검색어</p>
        <ul class="list"></ul>
      </div>

      <div class="recent-search-menu">
        <a href="#" class="remove-all menu-item">전체삭제</a>
        <a href="#" class="remove-off menu-item">최근 검색어 끄기</a>
      </div>
    `;
    return recentSearchAreaTag;
  }

  createRecommendSearchArea() {
    const recommendSearchAreaTag = `
      <div class="inner">
        <ul class="list">
        </ul>
      </div>
    `;

    return recommendSearchAreaTag;
  }

  handleRemoveRecentSearch(e) {
    e.preventDefault();
    const { confirmMsg, completeMsg, cancelMsg } = this.recentSearchMsg;

    if (!confirm(confirmMsg)) {
      alert(cancelMsg);
      return;
    }
    storage.removeFromLocalStorage("recent-search");
    this.fillRecentSearchWords();
    alert(completeMsg);
  }

  handleSearchFormItems(target) {
    const selectedText = target.innerText;
    this.inputEl.value = selectedText;
  }

  handleSearchFormMousedown(e) {
    if (e.target.closest(".search-area-dropdown")) {
      if (e.target.classList.contains("link")) {
        this.handleSearchFormItems(e.target);
        return;
      }

      if (e.target.classList.contains("remove-all")) {
        this.handleRemoveRecentSearch(e);
        return;
      }

      return;
    }
  }

  // TODO: 코드가 너무 비슷함, 수정하기
  showRecentSearchArea() {
    const recentSearchAreaTag = this.createRecentSearchArea();

    this.setSearchAreaDropDownInner(recentSearchAreaTag);
    this.setDisplayBlock(this.searchAreaDropDown);
    this.fillRecentSearchWords();
  }

  showRecommendSearchArea(jsonData) {
    const recommendSearchAreaTag = this.createRecommendSearchArea();
    this.setSearchAreaDropDownInner(recommendSearchAreaTag);
    this.setDisplayBlock(this.searchAreaDropDown);
    this.fillRecommendSearchWords(jsonData);
  }

  hideSearchAreaDropDown() {
    this.initSelectedIdx();
    this.setDisplayNone(this.searchAreaDropDown);
  }

  onSearchFormMousedown() {
    this.searchFormArea.addEventListener("mousedown", (e) =>
      this.handleSearchFormMousedown(e)
    );
  }

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      this.showRecentSearchArea();
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      this.initSelectedIdx();
      this.setDisplayNone(this.searchAreaDropDown);
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
      if (cur["recentSearchWord"] === curInput) return prev;
      const { no, recentSearchWord } = cur;
      return [...prev, { no: no + 1, recentSearchWord }];
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
    const currentData = { no: firstIdx, recentSearchWord: inputTxt };
    const currentDataCnt = 1;
    this.clearInput();
    let storedDatas = this.setStoredDatasIdx(inputTxt);

    if (storedDatas.length > this.localStorageDataSize - currentDataCnt) {
      storedDatas = this.removeLeastUsedData(storedDatas, "no");
    }
    storage.setLocalStorage("recent-search", [...storedDatas, currentData]);
    this.fillRecentSearchWords();
  }

  onFormSubmit() {
    this.form.addEventListener("submit", (e) => this.handleSubmitForm(e));
  }

  getNextIdx(idx) {
    return idx + 1;
  }

  getPrevIdx(idx) {
    return idx - 1;
  }

  computeIdx(key) {
    const vaildIdxNum = 0;
    const firstIdx = 0;
    const lastIdx = this.itemsCount - 1;

    switch (key) {
      case "ArrowDown":
        if (this.curSelectedIdx < vaildIdxNum) {
          this.curSelectedIdx = firstIdx;
          return;
        }
        this.curSelectedIdx = this.getNextIdx(this.curSelectedIdx);
        if (this.curSelectedIdx > lastIdx) {
          this.curSelectedIdx = firstIdx;
        }

        break;

      case "ArrowUp":
        this.curSelectedIdx = this.getPrevIdx(this.curSelectedIdx);
        if (this.curSelectedIdx < vaildIdxNum) {
          this.curSelectedIdx = lastIdx;
        }
        break;

      default:
        break;
    }
  }

  initSelectedIdx() {
    const initialIdx = -1;
    this.curSelectedIdx = initialIdx;
  }

  addClassSelectedItem(selector, className) {
    [...$$(selector)].forEach((el, idx) => {
      if (idx === this.curSelectedIdx) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    });
  }

  moveUsingArrowKey(key) {
    if (!this.itemsCount) return;

    this.computeIdx(key);
    this.addClassSelectedItem("[data-idx]", "focus");
    this.inputSelectedWord();
  }

  inputSelectedWord() {
    const selectedWord = $(`[data-idx="${this.curSelectedIdx}"]`).innerText;
    this.inputEl.value = selectedWord;
  }

  setGetInputWordFunc(delay) {
    this.getInputWord = debounce(() => {
      const searchWord = this.inputEl.value;
      fetchData(constants.recommendSearchUrl + searchWord).then((jsonData) => {
        this.showRecommendSearchArea(jsonData);
      });
    }, delay);
  }

  onKeyUpInput() {
    this.inputEl.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.hideSearchAreaDropDown();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        this.moveUsingArrowKey(e.key);
        return;
      }

      if (!this.inputEl.value) {
        this.showRecentSearchArea();
        return;
      }

      this.getInputWord();
      // this.showRecommendSearchArea();
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onKeyUpInput();
    this.onFormSubmit();
    this.onSearchFormMousedown();
  }

  init(delay) {
    this.setSearchFormElements();
    this.setGetInputWordFunc(delay);
    this.onEvent();
  }
}
