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

  fillSuggestSearchWords({ suggestions }) {
    if (!suggestions) return;
    const recentSearchList = this.searchAreaDropDown.querySelector(".list");
    const suggestionsData = suggestions.map((data) => data.value);
    this.setSearchItemsCount(suggestionsData);
    recentSearchList.innerHTML =
      this.createSuggestSearchElements(suggestionsData);
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

  createSuggestSearchElements(data) {
    const suggestSearchTag = data.reduce((prev, cur, idx) => {
      return (
        prev +
        `
        <li class="suggest-search-item">
          <a href="#" class="link" data-idx=${idx}>${cur}</a>
        </li>
      `
      );
    }, "");

    return suggestSearchTag;
  }

  isInputEmpty() {
    return this.inputEl.value.length === 0;
  }

  clearInput() {
    $(".search-form").reset();
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

  createSuggestSearchArea() {
    const suggestSearchAreaTag = `
      <div class="inner">
        <ul class="list">
        </ul>
      </div>
    `;

    return suggestSearchAreaTag;
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

  showSuggestSearchArea(jsonData) {
    const suggestSearchAreaTag = this.createSuggestSearchArea();
    this.setSearchAreaDropDownInner(suggestSearchAreaTag);
    this.setDisplayBlock(this.searchAreaDropDown);
    this.fillSuggestSearchWords(jsonData);
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
    let storedDatas = this.setStoredDatasIdx(inputTxt);

    if (storedDatas.length > this.localStorageDataSize - currentDataCnt) {
      storedDatas = this.removeLeastUsedData(storedDatas, "no");
    }
    storage.setLocalStorage("recent-search", [...storedDatas, currentData]);

    // 현재는 검색기능이 동작하지 않으므로 반영된 최근검색어 보여줌
    this.clearInput();
    this.showRecentSearchArea();
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

  setShowSuggestionFunc(delay) {
    this.getSuggestionWord = debounce(() => {
      if (this.isInputEmpty()) return;

      const searchWord = this.inputEl.value;
      const fetchUrl = constants.suggestionUrl + searchWord;

      this.initSelectedIdx();

      fetchData(fetchUrl).then((jsonData) => {
        this.showSuggestSearchArea(jsonData);
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

      if (this.isInputEmpty()) {
        this.initSelectedIdx();
        this.showRecentSearchArea();
        return;
      }

      this.getSuggestionWord();
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onKeyUpInput();
    this.onFormSubmit();
    this.onSearchFormMousedown();
  }

  init() {
    this.setSearchFormElements();
    this.setShowSuggestionFunc(constants.suggestionDelay);
    this.onEvent();
  }
}
