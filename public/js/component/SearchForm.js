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

  handleRemoveRecentSearch(e) {
    e.preventDefault();

    const confirmMsg = `저장된 최근 검색어를 모두 삭제하시겠습니까?`;
    const completeMsg = `삭제 되었습니다.`;
    const cancelMsg = `취소 되었습니다.`;

    if (!confirm(confirmMsg)) {
      e.stopPropagation();
      alert(cancelMsg);
      return;
    }
    storage.removeFromLocalStorage("recent-search");
    this.fillRecentSearchWords();
    alert(completeMsg);
  }

  onRecentSearchMenu() {
    const recentSearchMenu = this.recentSearchArea.querySelector(
      ".recent-search-menu"
    );

    recentSearchMenu.addEventListener("click", (e) => {
      if (!e.target.classList.contains("remove-all")) return;
      this.handleRemoveRecentSearch(e);
    });
  }

  onFocusInInput() {
    this.inputEl.addEventListener("focus", ({ target }) => {
      this.setElDisplayBlock(this.recentSearchArea);
      this.fillRecentSearchWords();
      this.onRecentSearchMenu();
    });
  }

  onFocusOutInput() {
    this.inputEl.addEventListener("blur", ({ target }) => {
      //   this.setElDisplayNone(this.recentSearchArea);
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
