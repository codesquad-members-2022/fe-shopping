import { SelectCategory } from './view/selectCategory.js';
import { SearchInput } from './view/searchInput.js';
import { AutoComplete } from './view/autoComplete.js';
import { RecentSearch } from './view/recentSearch.js';
import { KeywordLocalStorage } from './model/keywordLocalStorage.js';
import { getAutoCompleteData } from './model/autoCompleteData.js';
import { debounce, throttle } from './util.js';

export class Controller {
  constructor() {
    this.selectCategoryView = new SelectCategory();
    this.searchInputView = new SearchInput();
    this.recentSearchView = new RecentSearch();
    this.autoCompleteView = new AutoComplete();
    this.KeywordLocalStorage = new KeywordLocalStorage();
  }

  init() {
    this.setSelectCategoryEvents();
    this.setSearchInputViewEvents();
  }

  setSelectCategoryEvents() {
    this.selectCategoryView.categoryClickHandle = this.categoryClickHandle;
    this.selectCategoryView.setEvents();
  }

  setSearchInputViewEvents() {
    const delay = { focus: 500, mouseleave: 500 };

    this.searchInputView.focusInputHandle = this.focusInputHandle;
    this.searchInputView.typingInputHandle = debounce(this.typingInputHandle, delay.focus);
    this.searchInputView.submitFormHandle = this.submitFormHandle;
    this.searchInputView.mouseleaveListHandle = throttle(this.mouseleaveListHandle, delay.mouseleave);
    this.searchInputView.clickDropDownBtnHandle = this.clickDropDownBtnHandle;
    this.searchInputView.setEvents();
  }

  categoryClickHandle = (e) => {
    this.selectCategoryView.toggleSelectCategory();
    this.selectCategoryView.setArrowIcons();

    if (e.target.nodeName === 'A') {
      this.selectCategoryView.selectCategory(e);
    }
  };

  focusInputHandle = () => {
    if (!this.searchInputView.$input.value && !this.KeywordLocalStorage.keywordList.length) return;

    if (!this.searchInputView.$input.value) {
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
      this.searchInputView.addFocusClass();
    } else {
      this.changeAutoCompleteView(this.searchInputView.$input.value);
    }
  };

  async changeAutoCompleteView(inputValue) {
    if (!this.searchInputView.$input.value) return;

    const autoCompleteData = await getAutoCompleteData(inputValue);
    this.recentSearchView.removeRecentSearchChildNodes();

    !autoCompleteData.length
      ? this.autoCompleteView.emptyAutoComplete()
      : this.autoCompleteView.updateAutoComplete(autoCompleteData, inputValue);
  }

  typingInputHandle = () => {
    !this.searchInputView.$input.value
      ? this.searchInputView.removeFocusClass()
      : this.changeAutoCompleteView(this.searchInputView.$input.value);
  };

  submitFormHandle = (e) => {
    e.preventDefault();

    if (!this.searchInputView.$input.value) return;
    this.KeywordLocalStorage.addKeywordList(this.searchInputView.$input.value);
    this.searchInputView.removeFocusClass();
    this.searchInputView.resetInputText();
  };

  clickDropDownBtnHandle = (e) => {
    if (e.target.classList.contains('delete__btn')) {
      const keyword = e.target.parentNode.dataset.value;
      this.KeywordLocalStorage.removeKeywordList(keyword);
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
    }

    if (e.target.classList.contains('options--clear-keyword')) {
      this.KeywordLocalStorage.clearKeywordList();
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
    }
  };

  mouseleaveListHandle = () => {
    this.searchInputView.removeFocusClass();
  };
}
