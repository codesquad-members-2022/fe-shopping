import { webStorage, createElement, selector } from '../../utils/utils.js';

export class History {
  constructor({
    $form,
    $input,
    storageKey,
    maxHistoryLength,
    HISTORY_LIST,
    HISTORY_ITEM,
    HISTORY_ITEM_LINK,
    HISTORY_ITEM_DEL_BTN,
    HISTORY_CLEAR_BTN,
  }) {
    this.$form = $form;
    this.$input = $input;
    this.$historyList = selector(`.${HISTORY_LIST}`);

    this.key = storageKey;
    this.maxLength = maxHistoryLength;

    this.HISTORY_LIST = HISTORY_LIST;
    this.HISTORY_ITEM = HISTORY_ITEM;
    this.HISTORY_ITEM_LINK = HISTORY_ITEM_LINK;
    this.HISTORY_CLEAR_BTN = HISTORY_CLEAR_BTN;
    this.HISTORY_ITEM_DEL_BTN = HISTORY_ITEM_DEL_BTN;

    this.init();
  }

  init() {
    this.$form.addEventListener('submit', this.handleSubmitForm);

    this.$historyList.addEventListener('click', this.handleClickDelBtn);

    const $clearBtn = selector(`.${this.HISTORY_CLEAR_BTN}`);
    $clearBtn.addEventListener('click', this.handleClickClearBtn);
  }

  /* **리스너*** */
  handleSubmitForm = (e) => {
    e.preventDefault();
    const word = this.$input.value.trim();
    this.$input.value = '';

    if (word === '') return;
    this.setHistory(Date.now(), word);
  };

  handleClickClearBtn = (e) => {
    this.clear();
  };

  handleClickDelBtn = (e) => {
    const $target = e.target;
    if (!$target.classList.contains(this.delBtnClassName)) return;

    const $item = $target.closest(this.itemSelector);
    console.log($item);
  };
  /* ********** */

  setHistory(id, value) {
    let prevHistory = webStorage.get(this.key);
    if (!prevHistory) {
      prevHistory = {};
    }

    const ids = Object.keys(prevHistory);
    if (ids.length === this.maxLength) delete prevHistory[ids[0]];

    webStorage.set(this.key, { ...prevHistory, [id]: value });
    return true;
  }

  getHistory() {
    return webStorage.get(this.key);
  }

  removeHistory(id) {
    const prevHistory = webStorage.get(this.key);
    if (!prevHistory) return false;

    delete prevHistory[id];
    webStorage.set(this.key, prevHistory);
  }

  clear() {
    webStorage.clear(this.key);
  }
}
