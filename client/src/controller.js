import { SelectCategory } from './view/selectCategory.js';
import { SearchInput } from './view/searchInput.js';
import { RecentSearch } from './view/recentSearch.js';
import { AutoComplete } from './view/autoComplete.js';
import { KeywordLocalStorage } from './model/keywordLocalStorage.js';
import { getAutoCompleteData } from './model/autoCompleteData.js';
import { debounce, throttle } from './util.js';

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
      dropDownList: document.querySelector('.drop-down__list'),
    };

    this.focusKeybordItem;
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
    const delay = { focus: 500, mouseleave: 200, keydown: 100 };

    this.selector.input.addEventListener('focus', () => this.focusInputHandle());
    this.selector.input.addEventListener('input', debounce(this.typingInputHandle, delay.focus));
    this.selector.input.addEventListener('keydown', throttle(this.arrowKeyupInputHandle, delay.keydown));

    this.selector.inputDropDown.addEventListener(
      'mouseleave',
      throttle(() => {
        SearchInput.toggleClassName(this.selector.inputDropDown, 'focus');
      }, delay.mouseleave)
    );
  }

  setSearchFormEvents() {
    this.selector.form.addEventListener('submit', (e) => this.submitFormHandle(e));
    this.selector.form.addEventListener('click', (e) => this.clickDropDownHandle(e));
  }

  async changeAutoCompleteView(inputValue) {
    if (!this.selector.input.value) return;
    const autoCompleteData = await getAutoCompleteData(inputValue);
    this.recentSearchView.removeRecentSearchChildNodes();
    !autoCompleteData.length
      ? this.autoCompleteView.emptyAutoComplete()
      : this.autoCompleteView.updateAutoComplete(autoCompleteData, inputValue);
  }

  focusInputHandle() {
    if (!this.selector.input.value && !this.KeywordLocalStorage.keywordList.length) return;

    if (!this.selector.input.value && this.KeywordLocalStorage.keywordList.length > 0) {
      this.recentSearchView.updateRecentSearchList(this.KeywordLocalStorage.keywordList);
      SearchInput.toggleClassName(this.selector.inputDropDown, 'focus');
    }

    if (this.selector.input.value) {
      this.changeAutoCompleteView(this.selector.input.value);
    }
  }

  typingInputHandle = () => {
    if (!this.selector.input.value || document.querySelector('.item--focus')) return;
    this.changeAutoCompleteView(this.selector.input.value);
  };

  submitFormHandle(e) {
    e.preventDefault();

    if (!this.selector.input.value) return;
    this.KeywordLocalStorage.addKeywordList(this.selector.input.value);
    SearchInput.toggleClassName(this.selector.inputDropDown, 'focus');
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

  arrowKeyupInputHandle = (e) => {
    const focusClassName = 'item--focus';

    switch (e.key) {
      case 'ArrowDown':
        this.moveDownDropDownItem(focusClassName);
        break;
      case 'ArrowRight':
        if (!document.querySelector(`.${focusClassName}`)) return;
        this.changeAutoCompleteView(this.selector.input.value);
        break;
    }
  };

  moveDownDropDownItem(className) {
    const firstItem = this.selector.dropDownList.firstElementChild;
    const lastItem = this.selector.dropDownList.lastElementChild;

    if (firstItem.dataset.value === 'null') return; // 일치하는 데이터가 없는 경우

    if (this.focusKeybordItem === lastItem) {
      SearchInput.toggleClassName(this.focusKeybordItem, className);
      this.focusKeybordItem = firstItem;
    }

    if (!document.querySelector(`.${className}`)) {
      this.focusKeybordItem = firstItem;
    } else {
      SearchInput.toggleClassName(this.focusKeybordItem, className);
      this.focusKeybordItem = this.focusKeybordItem.nextElementSibling;
    }

    this.selector.input.value = this.focusKeybordItem.dataset.value;
    SearchInput.toggleClassName(this.focusKeybordItem, className);
  }
}
