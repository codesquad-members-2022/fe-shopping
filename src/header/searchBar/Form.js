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

const autoCompleteDelay = 500;
const popupboxDelay = 500;

export class SearchBarForm {
  constructor() {
    this.state = {};
    this.$form = selector(`.${FORM}`);
    this.$input = selector(`.${INPUT}`);
    this.$popupBox = selector(`.${FORM_POPUP_BOX}`);
    this.$submit = selector(`.${SUBMIT}`);

    this.history = this.initHistory();
    this.autoComplete = this.initAutoComplete();
    this.autoCompleteDelay = autoCompleteDelay;
    this.popupboxDelay = popupboxDelay;
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
    const inputKeyword = e.target.value;
    this.autoComplete.renderACKeywords(inputKeyword);
  };

  setPopupbox = (e) => {
    const inputKeyword = e.target.value;
    const $autoCompleteBox = selector(`.${AUTO_COMPLETE_BOX}`, this.$form);
    const $historyBox = selector(`.${HISTORY_BOX}`, this.$form);
    if (inputKeyword.length < 1) {
      addClass(HIDDEN, $autoCompleteBox);
      removeClass(HIDDEN, $historyBox);
      return;
    }
    addClass(HIDDEN, $historyBox);
    removeClass(HIDDEN, $autoCompleteBox);
  };
  /* ********** */

  closePopupbox() {
    addClass(HIDDEN, this.$popupBox);
  }
}
