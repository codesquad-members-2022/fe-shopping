import { model } from "../model/model.js";
import storage from "../util/storage.js";
import SearchView from "../view/SearchView.js";

import { isEmpty, debounce, fetchData } from "../util/util.js";

export const viewModel = {
  init({
    localStorage,
    viewOptions,
    viewModelOptions: {
      recentSearchKeyName,
      suggestionUrl,
      suggestionDelay,
      message,
    },
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
    model.setSelectedIdx({ idx: invalidIdx });
    model.searchDataCnt = jsonData.length;
    model.searchWord = searchWord;
    model.setSearchBarState({
      state: "suggest-search",
      callBackFn: this.searchView.renderDropdown.bind(this.searchView),
    });
    model.setSuggestWordData({
      data: jsonData,
      callBackFn: this.searchView.fillDropdownList.bind(this.searchView),
    });
  },

  sortDataAsc(data, sortKey) {
    return data.sort((a, b) => a[sortKey] - b[sortKey]);
  },

  getRecentWordData() {
    const storedData = storage.getLocalStorage(this.recentSearchKeyName);
    if (!storedData) {
      return [];
    }

    const sortKey = "no";
    const dataSortByAsc = this.sortDataAsc(storedData, sortKey);
    return dataSortByAsc;
  },

  handleFocusInput() {
    model.setSearchBarState({
      state: "recent-search",
      callBackFn: this.searchView.renderDropdown.bind(this.searchView),
    });

    model.setRecentWordData({
      data: this.getRecentWordData(),
      callBackFn: this.searchView.fillDropdownList.bind(this.searchView),
    });
  },

  handleBlurInput() {
    const unselectedIdx = -1;
    model.setSelectedIdx({
      idx: unselectedIdx,
      callBackFn: this.searchView.hideDropdown.bind(this.searchView),
    });
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

    model.setSelectedIdx({
      idx: resultIdx,
      callBackFn: this.searchView.addClassSelectedIdx.bind(this.searchView),
    });
  },

  handleArrowKeyUp(key) {
    if (!model.searchDataCnt) {
      return;
    }

    this.computeIdx(key, model.searchDataCnt);
  },

  resetInput() {
    const unselectedIdx = -1;
    model.setSearchBarState({
      state: "recent-search",
      callBackFn: this.searchView.clearInput.bind(this.searchView),
    });
    model.setSelectedIdx({
      idx: unselectedIdx,
    });
    this.handleFocusInput();
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
    this.handleFocusInput();
    alert(completeMsg);
  },
};
