import { SelectCategory } from './view/selectCategory.js';
import { SearchInput } from './view/searchInput.js';
import { RecentSearch } from './view/recentSearch.js';
import { AutoComplete } from './view/autoComplete.js';
import { KeywordLocalStorage } from './model/keywordLocalStorage.js';
import { getAutoCompleteData } from './model/autoCompleteData.js';

export class Controller {
  constructor() {
    this.KeywordLocalStorage = new KeywordLocalStorage();
    this.selectCategory = new SelectCategory();
    this.recentSearchView = new RecentSearch(this.KeywordLocalStorage.keywordList);
    this.autoCompleteView = new AutoComplete();

    this.selector = {
      form: document.querySelector('.search__form'),
      input: document.querySelector('.search__input'),
      select: document.querySelector('.select__category'),
      inputDropDown: document.querySelector('.input__drop-down'),
    };
  }

  init() {
    this.setSelectCategoryEvents();
    this.setSearchInputEvents();
    this.setSearchFormEvents();
  }

  setSelectCategoryEvents() {
    this.selector.select.addEventListener('click', (e) => {
      this.selectCategory.showCategory();

      if (e.target.nodeName === 'A') {
        this.selectCategory.selectCategory(e);
      }
    });
  }

  setSearchInputEvents() {
    this.selector.input.addEventListener('focus', () => this.focusInputHandle());
    this.selector.input.addEventListener('input', () => this.typingInputHandle());

    this.selector.inputDropDown.addEventListener('mouseleave', () =>
      SearchInput.toggleInputFocusClass()
    );
  }

  setSearchFormEvents() {
    this.selector.form.addEventListener('submit', (e) => this.submitFormHandle(e));
    this.selector.form.addEventListener('click', (e) => this.clickDropDownHandle(e));
  }

  async changeAutoCompleteView(inputValue) {
    if (!this.selector.input.value) return;

    const autoData = await getAutoCompleteData(inputValue);
    this.recentSearchView.removeRecentSearchChildNodes();
    this.autoCompleteView.updateAutoComplete(autoData);
  }

  focusInputHandle() {
    if (!this.selector.input.value && !this.KeywordLocalStorage.keywordList.length) return;

    if (!this.selector.input.value && this.KeywordLocalStorage.keywordList.length > 0) {
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
      SearchInput.toggleInputFocusClass();
    }

    if (this.selector.input.value) {
      this.changeAutoCompleteView(this.selector.input.value);
    }
  }

  typingInputHandle() {
    this.selector.input.value
      ? this.changeAutoCompleteView(this.selector.input.value)
      : SearchInput.toggleInputFocusClass();
  }

  submitFormHandle(e) {
    e.preventDefault();

    if (!this.selector.input.value) return;
    this.KeywordLocalStorage.addKeywordList(this.selector.input.value);
    SearchInput.toggleInputFocusClass();
    SearchInput.resetInputText();
  }

  clickDropDownHandle(e) {
    if (e.target.classList.contains('delete__btn')) {
      const keyword = e.target.previousElementSibling.innerText;
      this.KeywordLocalStorage.removeKeywordList(keyword);
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
    }

    if (e.target.classList.contains('options--clear-keyword')) {
      this.KeywordLocalStorage.clearKeywordList();
      this.recentSearchView.resetRecentSearchList();
    }
  }
}
