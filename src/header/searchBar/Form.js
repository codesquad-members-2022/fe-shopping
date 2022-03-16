import {
  selector,
  addClass,
  removeClass,
  toggleClass,
  hasAscendant,
  webStorage,
} from '../../utils/utils.js';

import { History } from './History.js';

const INPUT = 'search-bar-input';
const SUBMIT = 'search-bar-submit';
const FORM = 'search-bar-form';
const AUTO_COMPLETE_WRAPPER = 'auto-complete-wrapper';
const CLEAR_BTN = 'history-clear-btn';
const HIDDEN = 'hidden';
const HISTORY_LIST = 'history-list';
const HISTORY_ITEM = 'history-item';
const HISTORY_ITEM_DELETE_BTN = 'history-item-delete';

// history state
const storageKey = 'SearchFormHistory';
const maxhistoryLength = 9;

export class SearchBarForm {
  constructor() {
    this.state = {};
    this.$form = selector(`.${FORM}`);
    this.$input = selector(`.${INPUT}`);
    this.$acWrapper = selector(`.${AUTO_COMPLETE_WRAPPER}`);
    this.$submit = selector(`.${SUBMIT}`);
    this.history = new History({
      $form: this.$form,
      $input: this.$input,
      $clearBtn: selector(`.${CLEAR_BTN}`),
      $historyList: selector(`.${HISTORY_LIST}`),
      delBtnClassName: HISTORY_ITEM_DELETE_BTN,
      storageKey: storageKey,
      maxHistoryLength: maxhistoryLength,
      historyItemSelector: `.${HISTORY_ITEM}`,
    });

    this.$input.addEventListener('focusin', () => {
      removeClass(HIDDEN, this.$acWrapper);
    });
  }
}
