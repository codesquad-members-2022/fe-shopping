import {
  webStorage,
  createElement,
  selector,
  toggleClass,
} from '../../utils/utils.js';

const HIDDEN = 'hidden';

export class History {
  constructor({
    $form,
    $input,
    historyListKey,
    historyActivationKey,
    maxHistoryLength,
    HISTORY_TITLE,
    HISTORY_OFF_TITLE,
    HISTORY_LIST,
    HISTORY_ITEM,
    HISTORY_ITEM_LINK,
    HISTORY_ITEM_DEL_BTN,
    HISTORY_CLEAR_BTN,
    HISTORY_ONOFF_BTN,
  }) {
    this.$form = $form;
    this.$input = $input;
    this.$historyList = selector(`.${HISTORY_LIST}`);

    this.historyListKey = historyListKey;
    this.historyActivationKey = historyActivationKey;

    this.maxLength = maxHistoryLength;

    this.HISTORY_TITLE = HISTORY_TITLE;
    this.HISTORY_OFF_TITLE = HISTORY_OFF_TITLE;
    this.HISTORY_LIST = HISTORY_LIST;
    this.HISTORY_ITEM = HISTORY_ITEM;
    this.HISTORY_ITEM_LINK = HISTORY_ITEM_LINK;
    this.HISTORY_CLEAR_BTN = HISTORY_CLEAR_BTN;
    this.HISTORY_ONOFF_BTN = HISTORY_ONOFF_BTN;
    this.HISTORY_ITEM_DEL_BTN = HISTORY_ITEM_DEL_BTN;

    this.init();
  }

  init() {
    const isHistoryActive = this.getHistoryActivationState();
    if (!isHistoryActive) {
      selector(`.${this.HISTORY_ONOFF_BTN}`).textContent = '최근검색어켜기';
      this.setHistoryItems();
    }

    this.renderHistoryItems();
    this.$historyList.addEventListener('click', this.handleClickDelBtn);

    const $clearBtn = selector(`.${this.HISTORY_CLEAR_BTN}`);
    $clearBtn.addEventListener('click', this.handleClickClearBtn);

    const $onoffBtn = selector(`.${this.HISTORY_ONOFF_BTN}`);
    $onoffBtn.addEventListener('click', this.handleClickActivateBtn);
  }

  /* **리스너*** */
  handleClickClearBtn = (e) => {
    this.clearHistory();
    this.$historyList.innerHTML = '';
  };

  handleClickDelBtn = (e) => {
    const $target = e.target;
    if (!$target.classList.contains(this.HISTORY_ITEM_DEL_BTN)) return;
    const $item = $target.closest(`.${this.HISTORY_ITEM}`);
    const itemId = $item.dataset.id;
    this.removeHistory(itemId);
    this.removeHistoryItemElement($item);
  };

  handleClickActivateBtn = (e) => {
    const isHistoryActive = this.getHistoryActivationState();
    const $onoffBtn = e.currentTarget;

    this.setHistoryItems();
    if (isHistoryActive) {
      $onoffBtn.textContent = '최근검색어켜기';
      this.setHistoryActivationState(false);
      return;
    }

    $onoffBtn.textContent = '최근검색어끄기';
    this.setHistoryActivationState(true);
  };
  /* ********** */

  // handleSubmitForm = (itemId, keyword) => {
  //   this.setHistory(itemId, keyword);

  //   const $historyItem = this.createHistoryItemElement(itemId, keyword);
  //   this.$historyList.appendChild($historyItem);
  // };

  setHistoryItems() {
    const $historyList = this.$historyList;
    const $historyWrapper = $historyList.parentNode;
    const $historyTitle = selector(`.${this.HISTORY_TITLE}`, $historyWrapper);
    const $historyOffTitle = selector(
      `.${this.HISTORY_OFF_TITLE}`,
      $historyWrapper
    );

    toggleClass(HIDDEN, $historyList);
    toggleClass(HIDDEN, $historyTitle);
    toggleClass(HIDDEN, $historyOffTitle);
  }

  renderHistoryItems() {
    const history = this.getHistory(this.historyListKey);
    const $$historyItem = Object.entries(history).map(([id, value]) =>
      this.createHistoryItemElement(id, value)
    );

    const $fragment = new DocumentFragment();

    $$historyItem.reverse();
    $fragment.append(...$$historyItem);
    this.$historyList.appendChild($fragment);
  }

  createHistoryItemElement(id, keyword) {
    const $historyItem = createElement('li', this.HISTORY_ITEM, null, {
      'data-id': id,
    });

    const $historyItemLink = createElement(
      'a',
      this.HISTORY_ITEM_LINK,
      keyword,
      {
        href: `./search.html?q=${keyword}`,
      }
    );

    const $historyDelBtn = createElement(
      'span',
      this.HISTORY_ITEM_DEL_BTN,
      '삭제'
    );

    $historyItem.appendChild($historyItemLink);
    $historyItem.appendChild($historyDelBtn);
    return $historyItem;
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
    const prevHistory = this.getHistory();

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
    webStorage.set(this.historyListKey, prevHistory);
    return true;
  }

  getHistory() {
    return webStorage.get(this.historyListKey) ?? {};
  }

  removeHistory(id) {
    const prevHistory = webStorage.get(this.historyListKey);
    if (!prevHistory) return false;

    delete prevHistory[id];
    webStorage.set(this.historyListKey, prevHistory);
    return true;
  }

  clearHistory() {
    webStorage.clear(this.historyListKey);
  }

  setHistoryActivationState(bool) {
    if (![true, false].includes(bool)) throw new Error();
    webStorage.set(this.historyActivationKey, bool);
  }

  getHistoryActivationState() {
    const isHistoryActive = webStorage.get(this.historyActivationKey);
    return isHistoryActive ?? true;
  }
}
