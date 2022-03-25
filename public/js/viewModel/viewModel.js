import { model } from "../model/model.js";
import storage from "../util/storage.js";
import SearchView from "../view/SearchView.js";

import { isEmpty } from "../util/util.js";

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

  getRecentSearchData() {
    model.setRecentWordData({
      data: storage.getLocalStorage(recentSearchKeyName),
      callBackFn: this.searchView.fillDropdownList,
    });
  },

  handleSearchViewEvents() {
    this.searchView.handleFocusInput = this.handleFocusInput.bind(this);
    this.searchView.handleBlurInput = this.handleBlurInput.bind(this);
    this.searchView.handleEscKeyUp = this.handleEscKeyUp.bind(this);
    this.searchView.handleArrowKeyUp = this.handleArrowKeyUp.bind(this);
    this.searchView.handleSubmit = this.handleSubmit.bind(this);
  },

  handleFocusInput() {
    model.setSearchBarState({
      state: "recent-search",
      callBackFn: this.searchView.renderDropdown.bind(this.searchView),
    });

    model.setRecentWordData({
      data: storage.getLocalStorage(this.recentSearchKeyName),
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

    if (key === "ArrowDown") {
      let nextIdx = getNextIdx(model.selectedIdx);
      if (isOverMaxIdx(nextIdx)) {
        nextIdx = firstIdx;
      }

      model.setSelectedIdx({
        idx: nextIdx,
        callBackFn: this.searchView.addClassSelectedIdx.bind(this.searchView),
      });

      return;
    }

    if (key === "ArrowUp") {
      let prevIdx = getPrevIdx(model.selectedIdx);
      if (!isValidIdx(prevIdx)) {
        prevIdx = lastIdx;
      }

      model.setSelectedIdx({
        idx: prevIdx,
        callBackFn: this.searchView.addClassSelectedIdx.bind(this.searchView),
      });
    }

    return;
  },

  handleArrowKeyUp(key) {
    if (!model.searchDataCnt) return;

    this.computeIdx(key, model.searchDataCnt);
  },

  handleSubmit(e) {
    e.preventDefault();
    const inputTxt = this.searchView.$input.value;
    if (isEmpty(inputTxt)) return;

    this.localStorage.storeItem(this.recentSearchKeyName, inputTxt);
    // submit된 후에 새로 화면 보여주는 것도 구현해야함.
    // 일단 원래 하던 방향키로 돌아가자
  },
};
