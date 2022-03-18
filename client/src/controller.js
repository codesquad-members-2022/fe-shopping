import { SelectCategory } from './view/selectCategory.js';
import { SearchInput } from './view/searchInput.js';
import { LocalStorage } from './model/localStorage.js';

export class Controller {
  constructor() {
    this.localStorage = new LocalStorage();
    this.selectCategory = new SelectCategory();
    this.searchInput = new SearchInput(this.localStorage.keywordList);

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
      this.searchInput.toggleInputFocusClass()
    );
  }

  setSearchFormEvents() {
    this.selector.form.addEventListener('submit', (e) => this.submitFormHandle(e));
    this.selector.form.addEventListener('click', (e) => this.clickDropDownHandle(e));
  }

  focusInputHandle() {
    if (!this.selector.input.value && !this.localStorage.keywordList.length) return;

    if (this.selector.input.value) {
      this.searchInput.updateAutoComplete();
      this.searchInput.toggleInputFocusClass();
    } else if (this.localStorage.keywordList.length > 0) {
      this.selector.inputDropDown.classList.remove('auto-complete');
      this.selector.inputDropDown.classList.add('recent-search');
      this.searchInput.updateRecentSearchList(this.localStorage.keywordList);
    }
    this.searchInput.toggleInputFocusClass();
  }

  typingInputHandle() {
    this.selector.input.value
      ? this.searchInput.updateAutoComplete()
      : this.searchInput.toggleInputFocusClass();
  }

  submitFormHandle(e) {
    e.preventDefault();

    if (!this.selector.input.value) return;
    this.localStorage.addKeywordList(this.selector.input.value);
    this.searchInput.toggleInputFocusClass();
    this.searchInput.resetInputText();
  }

  clickDropDownHandle(e) {
    if (e.target.classList.contains('delete__btn')) {
      this.localStorage.removeKeywordList(e);
      this.searchInput.updateRecentSearchList(this.localStorage.keywordList);
    }

    if (e.target.classList.contains('options--clear-keyword')) {
      this.localStorage.clearKeywordList();
      this.searchInput.resetRecentSearchList();
      this.searchInput.toggleInputFocusClass();
    }
  }
}
