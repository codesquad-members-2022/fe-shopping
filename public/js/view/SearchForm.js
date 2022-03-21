import storage from "../util/storage.js";

export default class {
  constructor({ searchFormArea, localStorageDataSize, recentSearchMsg }) {
    this.searchFormArea = searchFormArea;
    this.localStorageDataSize = localStorageDataSize;
    this.recentSearchMsg = recentSearchMsg;
  }

  findElementFromArea(selector) {
    return this.searchFormArea.querySelector(selector);
  }

  setSearchFormElements() {
    this.form = this.findElementFromArea(".search-form");
    this.inputEl = this.findElementFromArea(".search-input");
    this.searchAreaDropDown = this.findElementFromArea(".search-area-dropdown");
    // this.recentSearchArea = this.findElementFromArea(".recent-search-area");
    // this.recommendSearchArea = this.findElementFromArea(
    //   ".recommend-search-area"
    // );
  }

  fillRecentSearchWords() {
    const recentSearchList = this.searchAreaDropDown.querySelector(".list");
    const storedDatas = storage.getLocalStorage("recent-search");
    if (!storedDatas) {
      recentSearchList.innerHTML = "";
      return;
    }
    const DataSortByAsc = this.sortDataAsc(storedDatas, "no");
    recentSearchList.innerHTML = this.createRecentSearchElements(DataSortByAsc);
  }

  createRecentSearchElements(data) {
    const recentSearchElTag = data.reduce((prev, cur) => {
      return (
        prev +
        `<li class="recent-search-item">
            <a href="#" class="link">${cur["recentSearchWord"]}</a>
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

  onSearchFormMousedown() {
    this.searchFormArea.addEventListener("mousedown", (e) =>
      this.handleSearchFormMousedown(e)
    );
  }

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      this.setSearchAreaDropDownInner(this.createRecentSearchArea());
      this.setDisplayBlock(this.searchAreaDropDown);
      this.fillRecentSearchWords();
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
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

  onKeyUpInput() {
    this.inputEl.addEventListener("keyup", ({ target }) => {
      // this.setDisplayNone(this.recentSearchArea);
      // this.setDisplayBlock(this.recommendSearchArea);
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
