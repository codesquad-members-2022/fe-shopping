import { selector, removeClass } from '../../utils/utils.js';

import { History } from './History.js';

const FORM = 'search-bar-form';
const INPUT = 'search-bar-input';
const SUBMIT = 'search-bar-submit';
const AUTO_COMPLETE_WRAPPER = 'auto-complete-wrapper';
const HIDDEN = 'hidden';
const HISTORY_LIST = 'history-list';
const HISTORY_ITEM = 'history-item';
const HISTORY_ITEM_LINK = 'history-item-link';
const HISTORY_ITEM_DELETE_BTN = 'history-item-delete';
const HISTORY_CLEAR_BTN = 'history-clear-btn';

export class SearchBarForm {
  constructor() {
    this.state = {};
    this.$form = selector(`.${FORM}`);
    this.$input = selector(`.${INPUT}`);
    this.$acWrapper = selector(`.${AUTO_COMPLETE_WRAPPER}`);
    this.$submit = selector(`.${SUBMIT}`);

    this.history = this.initHistory();
    this.init();
  }

  init() {
    this.$input.addEventListener('focusin', () => {
      removeClass(HIDDEN, this.$acWrapper);
    });
  }

  initHistory() {
    const storageKey = 'SearchFormHistory';
    const maxHistoryLength = 9;

    return new History({
      $form: this.$form,
      $input: this.$input,
      storageKey: storageKey,
      maxHistoryLength: maxHistoryLength,
      HISTORY_LIST: HISTORY_LIST,
      HISTORY_ITEM: HISTORY_ITEM,
      HISTORY_ITEM_LINK: HISTORY_ITEM_LINK,
      HISTORY_CLEAR_BTN: HISTORY_CLEAR_BTN,
      HISTORY_ITEM_DEL_BTN: HISTORY_ITEM_DELETE_BTN,
    });
  }
}
