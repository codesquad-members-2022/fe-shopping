import storage from "../util/storage.js";
import { $, $$ } from "../util/util.js";

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
          <li class="recommend-search-item">
            <a href="#" class="link">아이폰</a>
          </li>
          <li class="recommend-search-item">
            <a href="#" class="link">아이폰</a>
          </li>
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

  showRecommendSearchArea() {
    const recommendSearchAreaTag = this.createRecommendSearchArea();
    this.setSearchAreaDropDownInner(recommendSearchAreaTag);
    this.setDisplayBlock(this.searchAreaDropDown);
  }

  hideSearchAreaDropDown() {
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
        } else {
          this.curSelectedIdx = this.getNextIdx(this.curSelectedIdx);
          if (this.curSelectedIdx > lastIdx) {
            this.curSelectedIdx = firstIdx;
          }
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

  foucusSelectedItem() {
    const curItem = $(`[data-idx="${this.curSelectedIdx}"]`);
    curItem.classList.add("focus");
  }

  removeClassFromSelector(selector, className) {
    [...$$(selector)].forEach((el) => {
      el.classList.remove(className);
    });
  }

  onKeyUpInput() {
    this.inputEl.addEventListener("keyup", (e) => {
      if (e.code === "Escape") {
        this.initSelectedIdx();
        this.hideSearchAreaDropDown();
        return;
      }
      if (e.code === "ArrowDown" || e.code === "ArrowUp") {
        this.computeIdx(e.code);
        this.removeClassFromSelector("[data-idx]", "focus");
        this.foucusSelectedItem();
        this.inputEl.focus();
        return;
      }

      if (!this.inputEl.value) {
        this.showRecentSearchArea();
        return;
      }

      if (e.code === "Enter") {
        if (this.curSelectedIdx < 0) return;
        // select된 아이템이 없으면 submit이 일어나야함 (return)
        this.inputEl.value = $(`[data-idx="${this.curSelectedIdx}"]`).innerText;
        this.initSelectedIdx();
      }

      this.showRecommendSearchArea();
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
    this.onEvent();
  }
}
