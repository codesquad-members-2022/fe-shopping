import { model } from "../model/model.js";
import storage from "../util/storage.js";
import SearchView from "../view/SearchView.js";

import { isEmpty, debounce, fetchData } from "../util/util.js";

export const controller = {
  init({
    localStorage,
    viewOptions,
    options: { recentSearchKeyName, suggestionUrl, suggestionDelay, message },
  }) {
    this.localStorage = localStorage;
    this.message = message;
    this.recentSearchKeyName = recentSearchKeyName;
    this.suggestionUrl = suggestionUrl;
    this.suggestionDelay = suggestionDelay;
    this.searchView = new SearchView(viewOptions);

    model.init();
    this.handleSearchViewEvents();
    this.searchView.init();
  },

  handleSearchViewEvents() {
    this.searchView.handleFocusInput = this.handleFocusInput.bind(this);
    this.searchView.handleBlurInput = this.handleBlurInput.bind(this);
    this.searchView.handleEscKeyUp = this.handleEscKeyUp.bind(this);
    this.searchView.handleArrowKeyUp = this.handleArrowKeyUp.bind(this);
    this.searchView.handleSubmit = this.handleSubmit.bind(this);
    this.setFuncSuggestionWord();
    this.searchView.getSuggestionWord = this.getSuggestionWord.bind(this);
    this.searchView.handleMouseDown = this.handleMouseDown.bind(this);
  },

  setFuncSuggestionWord() {
    this.getSuggestionWord = debounce((inputTxt) => {
      const fetchUrl = this.suggestionUrl + inputTxt;
      const filterData = (json) => json["suggestions"].map((el) => el.value);

      fetchData(fetchUrl)
        .then((json) => filterData(json))
        .then((filteredData) => {
          this.setSearchBarSuggestWord(filteredData, inputTxt);
        });
    }, this.suggestionDelay);
  },

  setSearchBarSuggestWord(jsonData, searchWord) {
    const invalidIdx = -1;
    model.selectedIdx = invalidIdx;
    model.suggestWordData = jsonData;
    model.searchDataCnt = jsonData.length;
    model.searchWord = searchWord;
    model.searchBarState = "suggest-search";

    this.searchView.renderDropdown({
      data: model.suggestWordData,
      state: model.searchBarState,
      searchWord: model.searchWord,
    });
  },

  _sortDataAsc(data1, data2) {
    return data1.no - data2.no;
  },

  getRecentWordData() {
    const storedData = storage.getLocalStorage(this.recentSearchKeyName);
    if (!storedData) {
      return [];
    }

    const dataSortByAsc = storedData.sort(this._sortDataAsc);
    return dataSortByAsc;
  },

  handleFocusInput() {
    model.searchBarState = "recent-search";
    model.recentWordData = this.getRecentWordData();

    this.searchView.renderDropdown({
      data: model.recentWordData,
      state: model.searchBarState,
    });
  },

  handleBlurInput() {
    const unselectedIdx = -1;
    model.selectedIdx = unselectedIdx;
    this.searchView.hideDropdown();
  },

  handleEscKeyUp() {
    this.handleBlurInput();
  },

  computeIdx(key, dataCnt) {
    const validIdxStart = 0;
    const firstIdx = 0;
    const lastIdx = dataCnt - 1;
    const isValidIdx = (idx) => idx >= validIdxStart;
    const isOverMaxIdx = (idx) => idx > lastIdx;
    const getNextIdx = (idx) => idx + 1;
    const getPrevIdx = (idx) => idx - 1;
    let resultIdx;

    if (key === "ArrowDown") {
      let nextIdx = getNextIdx(model.selectedIdx);
      if (isOverMaxIdx(nextIdx)) {
        nextIdx = firstIdx;
      }
      resultIdx = nextIdx;
    }

    if (key === "ArrowUp") {
      let prevIdx = getPrevIdx(model.selectedIdx);
      if (!isValidIdx(prevIdx)) {
        prevIdx = lastIdx;
      }
      resultIdx = prevIdx;
    }

    model.selectedIdx = resultIdx;
    this.searchView.addClassSelectedIdx(model.selectedIdx);
  },

  handleArrowKeyUp(key) {
    if (!model.searchDataCnt) {
      return;
    }

    this.computeIdx(key, model.searchDataCnt);
  },

  resetInput() {
    const unselectedIdx = -1;
    model.searchBarState = "recent-search";
    model.selectedIdx = unselectedIdx;
    this.searchView.clearInput();
    this.searchView.handleFocusInput();
  },

  handleSubmit(e) {
    e.preventDefault();
    const inputTxt = this.searchView.$input.value;
    if (isEmpty(inputTxt)) {
      return;
    }

    this.localStorage.storeItem(this.recentSearchKeyName, inputTxt);
    this.resetInput();
  },

  handleMouseDown(e) {
    const { target } = e;
    if (!target.closest(".search-area-dropdown")) {
      return;
    }
    if (target.classList.contains("link")) {
      this.searchView.inputSelectedTxt(target);
      return;
    }
    if (target.closest(".search-area-dropdown")) {
      this.handleRemoveRecentSearch(e);
    }
  },

  handleRemoveRecentSearch(e) {
    e.preventDefault();
    const { confirmMsg, completeMsg, cancelMsg } = this.message;

    if (!confirm(confirmMsg)) {
      alert(cancelMsg);
      return;
    }

    storage.removeFromLocalStorage(this.recentSearchKeyName);
    this.searchView.handleFocusInput();
    alert(completeMsg);
  },
};
