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

  handleArrowKeyUp(key) {
    console.log(key);
    if (!model.searchDataCnt) return;
    // 여기 작성 계속해야함, 저장된 데이터가 없어서 확인불가. 로컬스토리지 저장부터 다시
  },

  handleSubmit(e) {
    e.preventDefault();
    const inputTxt = this.searchView.$input.value;
    if (isEmpty(inputTxt)) return;

    this.localStorage.storeItem(this.recentSearchKeyName, inputTxt);
  },
};
