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
    this.recentSearchArea = this.findElementFromArea(".recent-search-area");
  }

  fillRecentSearchWords() {
    const recentSearchList = this.recentSearchArea.querySelector(".list");
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

  onSearchFormClick() {
    this.searchFormArea.addEventListener("click", (e) => {
      // 현재 searchFromClick 이벤트는 최근 검색어 전체 삭제만 작동
      if (!e.target.classList.contains("remove-all")) return;
      this.handleRemoveRecentSearch(e);
    });
  }

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      this.setDisplayBlock(this.recentSearchArea);
      this.fillRecentSearchWords();
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      // this.setDisplayNone(this.recentSearchArea);
      // TODO: 최근검색어를 조작중일 때에는 사라지지 않도록 해야함
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
      //    this.setElDisplayNone(this.recentSearchArea);
      // TODO: 입력시 최근검색어란이 사라지게 하여야 함(현재 최근검색어 동작 확인을 위해 주석처리)
    });
  }

  onEvent() {
    this.onFocusInput();
    this.onKeyUpInput();
    this.onFormSubmit();
    this.onSearchFormClick();
  }

  init() {
    this.setSearchFormElements();
    this.onEvent();
  }
}
