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
    if (!$target.classList.contains(this.HISTORY_ITEM_DEL_BTN)) return;
    const $item = $target.closest(`.${this.HISTORY_ITEM}`);
    const itemId = $item.dataset.id;
    this.removeHistory(itemId);
    this.removeHistoryItemElement($item);
  };
  /* ********** */

  createHistoryItemElement(id, keyword) {
    const $historyItem = createElement('li', this.HISTORY_ITEM, null, {
      'data-id': id,
    });

    const $historyItemLink = createElement(
      'a',
      this.HISTORY_ITEM_LINK,
      keyword,
      {
        href: './',
      }
    );

    const $historyDelBtn = createElement(
      'span',
      this.HISTORY_ITEM_DEL_BTN,
      '삭제'
    );

    const $fragment = new DocumentFragment();

    $historyItem.appendChild($historyItemLink);
    $historyItem.appendChild($historyDelBtn);
    $fragment.appendChild($historyItem);

    return $fragment;
  }

  removeHistoryItemElement($item) {
    this.$historyList.removeChild($item);
  }

  removeHistoryItemElementById(id) {
    const $item = selector(`.${this.HISTORY_ITEM}[data-id='${id}']`);

    if (!$item) return false;
    this.$historyList.removeChild($item);
    return true;
  }

  setHistory(id, value) {
    const prevHistory = webStorage.get(this.key) ?? {};

    const prevIds = Object.keys(prevHistory).filter((_id) => {
      if (prevHistory[_id] !== value) return true;
      delete prevHistory[_id];
      this.removeHistoryItemElementById(_id);
      return false;
    });

    if (prevIds.length === this.maxLength) {
      const firstId = prevIds[0];
      delete prevHistory[firstId];
      this.removeHistoryItemElementById(firstId);
    }

    // { ...prevHistory, [id]: value }
    prevHistory[id] = value;
    webStorage.set(this.key, prevHistory);
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
    return true;
  }

  clear() {
    webStorage.clear(this.key);
  }
}
