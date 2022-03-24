import {
  selector,
  addClass,
  removeClass,
  debounce,
} from '../../utils/utils.js';

import { History } from './History.js';
import { historyStore } from './historyStore.js';
import { AutoComplete } from './AutoComplete.js';

const FORM = 'search-bar-form';
const INPUT = 'search-bar-input';
const SUBMIT = 'search-bar-submit';
const FORM_POPUP_BOX = 'search-bar-form-popup-box';
const DISPLAY_NONE = 'hidden';

const HISTORY_BOX = 'history';
const HISTORY_LIST = 'history-list';
const AUTO_COMPLETE_BOX = 'auto-complete';
const AUTO_COMPLETE_LIST = 'auto-complete-list';
const ROTATION_LIST = 'rotation-list';
const SELECTED = 'is-selected';

const ROTATION_KEYWORD = 'rotation-keyword';

export class SearchBarForm {
  constructor() {
    this.$form = selector(`.${FORM}`);
    this.$input = selector(`.${INPUT}`);
    this.$popupBox = selector(`.${FORM_POPUP_BOX}`);
    this.$submit = selector(`.${SUBMIT}`);

    this.initialInputKeyword = '';
    this.history = this.initHistory();
    this.autoComplete = this.initAutoComplete();
    this.keywordRotationDelay = 0;
  }

  init() {
    const autoCompleteDelay = 500;
    const popupboxDelay = 500;

    this.$input.addEventListener('mousedown', () => {
      removeClass(DISPLAY_NONE, this.$popupBox);
    });

    this.$form.addEventListener('submit', this.handleSubmit);

    this.$input.addEventListener(
      'keyup',
      debounce(this.handleKeyup, autoCompleteDelay)
    );

    this.$input.addEventListener(
      'keyup',
      debounce(this.setPopupbox, popupboxDelay)
    );

    this.$input.addEventListener('keydown', this.handleKeywordRotation);
  }

  initHistory() {
    const historyListKey = 'HistoryList';
    const historyActivationKey = 'isHistoryActive';
    const maxHistoryLength = 9;

    return new History({
      historyListKey: historyListKey,
      historyActivationKey: historyActivationKey,
      maxHistoryLength: maxHistoryLength,
      ROTATION_KEYWORD: ROTATION_KEYWORD,
    });
  }

  initAutoComplete() {
    return new AutoComplete({ AUTO_COMPLETE_LIST: AUTO_COMPLETE_LIST });
  }

  /* **리스너*** */
  handleSubmit = (e) => {
    const keyword = this.$input.value.trim();
    if (keyword === '') {
      e.preventDefault();
      return;
    }

    historyStore.setItem(Date.now(), keyword);
  };

  handleKeyup = (e) => {
    if (this.isKeyCodeArrow(e.code)) return;

    const inputKeyword = e.target.value;
    this.autoComplete.renderACKeywords(inputKeyword);
  };

  handleKeywordRotation = (e) => {
    if (e.isComposing || e.keyCode === 229) return;

    if (!this.isKeyCodeArrowUpOrDown(e.code)) return;
    e.preventDefault();

    const $rotationList = selector(`.${ROTATION_LIST}`, this.$popupBox);
    const $selectedItem = selector(`.${SELECTED}`, $rotationList);
    const $target = this.getNextRotationItem(
      e.code,
      $rotationList,
      $selectedItem
    );

    let keywordOfSelectedItem;
    if (!$target) keywordOfSelectedItem = this.initialInputKeyword;
    else {
      const $targetKeyword = selector(`.${ROTATION_KEYWORD}`, $target);
      keywordOfSelectedItem = $targetKeyword.textContent;
    }

    this.$input.value = keywordOfSelectedItem;

    removeClass(SELECTED, $selectedItem);
    addClass(SELECTED, $target);
  };

  setPopupbox = (e) => {
    if (this.isKeyCodeArrow(e.code)) return;
    const inputKeyword = e.target.value;
    this.setInitialInputKeyword(inputKeyword);
    const $autoCompleteBox = selector(`.${AUTO_COMPLETE_BOX}`, this.$form);
    const $autoCompleteList = selector(
      `.${AUTO_COMPLETE_LIST}`,
      $autoCompleteBox
    );

    const $historyBox = selector(`.${HISTORY_BOX}`, this.$form);
    const $historyList = selector(`.${HISTORY_LIST}`, $historyBox);

    const $prevRotationList = selector(`.${ROTATION_LIST}`, this.$popupBox);
    const $selectedItem = selector(`.${SELECTED}`, $prevRotationList);
    if ($selectedItem) removeClass(SELECTED, $selectedItem);

    if (inputKeyword.length < 1) {
      addClass(DISPLAY_NONE, $autoCompleteBox);
      removeClass(DISPLAY_NONE, $historyBox);
      addClass(ROTATION_LIST, $historyList);
      removeClass(ROTATION_LIST, $autoCompleteList);
      return;
    }
    addClass(DISPLAY_NONE, $historyBox);
    removeClass(DISPLAY_NONE, $autoCompleteBox);
    addClass(ROTATION_LIST, $autoCompleteList);
    removeClass(ROTATION_LIST, $historyList);
  };
  /* ********** */

  getNextRotationItem(code, $rotationList, $selectedItem) {
    if (this.isKeyCodeArrowUp(code)) {
      if (!$selectedItem) return $rotationList.lastElementChild;
      return $selectedItem.previousElementSibling;
    }

    // code === ArrowDown
    if (!$selectedItem) return $rotationList.firstElementChild;
    return $selectedItem.nextElementSibling;
  }

  closePopupbox() {
    addClass(DISPLAY_NONE, this.$popupBox);
  }

  isKeyCodeArrow(code) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code))
      return true;
    return false;
  }

  isKeyCodeArrowUpOrDown(code) {
    if (code === 'ArrowUp' || code === 'ArrowDown') return true;
    return false;
  }

  isKeyCodeArrowUp(code) {
    if (code === 'ArrowUp') return true;
    return false;
  }

  isKeyCodeArrowDown(code) {
    if (code === 'ArrowDown') return true;
    return false;
  }

  setInitialInputKeyword(keyword) {
    this.initialInputKeyword = keyword;
  }
}
