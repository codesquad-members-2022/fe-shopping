import {
  selector,
  addClass,
  removeClass,
  debounce,
} from '../../utils/utils.js';

import { History } from './History.js';
import { AutoComplete } from './AutoComplete.js';

const FORM = 'search-bar-form';
const INPUT = 'search-bar-input';
const SUBMIT = 'search-bar-submit';
const FORM_POPUP_BOX = 'search-bar-form-popup-box';
const HIDDEN = 'hidden';

const HISTORY_BOX = 'history';
const HISTORY_TITLE = 'history-title';
const HISTORY_OFF_TITLE = 'history-off-title';
const HISTORY_LIST = 'history-list';
const HISTORY_ITEM = 'history-item';
const HISTORY_ITEM_LINK = 'history-item-link';
const HISTORY_ITEM_DELETE_BTN = 'history-item-delete';
const HISTORY_CLEAR_BTN = 'history-clear-btn';
const HISTORY_ONOFF_BTN = 'history-onoff-btn';

const AUTO_COMPLETE_BOX = 'auto-complete';
const AUTO_COMPLETE_LIST = 'auto-complete-list';
const ROTATION_LIST = 'rotation-list';
const SELECTED = 'is-selected';
const ROTATION_KEYWORD = 'rotation-keyword';

const autoCompleteDelay = 500;
const popupboxDelay = 500;

export class SearchBarForm {
  constructor() {
    this.$form = selector(`.${FORM}`);
    this.$input = selector(`.${INPUT}`);
    this.$popupBox = selector(`.${FORM_POPUP_BOX}`);
    this.$submit = selector(`.${SUBMIT}`);

    this.initialInputKeyword = '';
    this.history = this.initHistory();
    this.autoComplete = this.initAutoComplete();
    this.autoCompleteDelay = autoCompleteDelay;
    this.popupboxDelay = popupboxDelay;
    this.keywordRotationDelay = 0;
  }

  init() {
    this.$input.addEventListener('mousedown', () => {
      removeClass(HIDDEN, this.$popupBox);
    });

    this.$form.addEventListener('submit', this.handleSubmit);
    this.$input.addEventListener(
      'keyup',
      debounce(this.handleKeyup, this.autoCompleteDelay)
    );

    this.$input.addEventListener(
      'keyup',
      debounce(this.setPopupbox, this.popupboxDelay)
    );

    this.$input.addEventListener(
      'keydown',
      debounce(this.handleKeywordRotation, this.keywordRotationDelay)
    );
  }

  initHistory() {
    const historyListKey = 'HistoryList';
    const historyActivationKey = 'isHistoryActive';
    const maxHistoryLength = 9;

    return new History({
      $form: this.$form,
      $input: this.$input,
      historyListKey: historyListKey,
      historyActivationKey: historyActivationKey,
      maxHistoryLength: maxHistoryLength,
      HISTORY_TITLE: HISTORY_TITLE,
      HISTORY_OFF_TITLE: HISTORY_OFF_TITLE,
      HISTORY_LIST: HISTORY_LIST,
      HISTORY_ITEM: HISTORY_ITEM,
      HISTORY_ITEM_LINK: HISTORY_ITEM_LINK,
      HISTORY_CLEAR_BTN: HISTORY_CLEAR_BTN,
      HISTORY_ONOFF_BTN: HISTORY_ONOFF_BTN,
      HISTORY_ITEM_DEL_BTN: HISTORY_ITEM_DELETE_BTN,
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

    this.history.setHistory(Date.now(), keyword);
  };

  handleKeyup = (e) => {
    if (this.isKeyCodeArrow(e.code)) return;

    const inputKeyword = e.target.value;
    this.autoComplete.renderACKeywords(inputKeyword);
  };

  handleKeywordRotation = (e) => {
    if (!this.isKeyCodeArrowUpOrDown(e.code)) return;
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

    const keywordLength = keywordOfSelectedItem.length;
    this.$input.value = keywordOfSelectedItem;
    this.$input.setSelectionRange(keywordLength, keywordLength);

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
      addClass(HIDDEN, $autoCompleteBox);
      removeClass(HIDDEN, $historyBox);
      addClass(ROTATION_LIST, $historyList);
      removeClass(ROTATION_LIST, $autoCompleteList);
      return;
    }
    addClass(HIDDEN, $historyBox);
    removeClass(HIDDEN, $autoCompleteBox);
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
    addClass(HIDDEN, this.$popupBox);
  }

  isKeyCodeArrow(code) {
    if (
      code === 'ArrowUp' ||
      code === 'ArrowDown' ||
      code === 'ArrowLeft' ||
      code === 'ArrowRight'
    )
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
