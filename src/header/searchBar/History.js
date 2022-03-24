import {
  webStorage,
  createElement,
  selector,
  toggleClass,
} from '../../utils/utils.js';

const DISPLAY_NONE = 'hidden';

const HISTORY_TITLE = 'history-title';
const HISTORY_OFF_TITLE = 'history-off-title';
const HISTORY_LIST = 'history-list';
const HISTORY_ITEM = 'history-item';
const HISTORY_ITEM_LINK = 'history-item-link';
const HISTORY_ITEM_DEL_BTN = 'history-item-delete';
const HISTORY_CLEAR_BTN = 'history-clear-btn';
const HISTORY_ONOFF_BTN = 'history-onoff-btn';

export class History {
  constructor({
    historyListKey,
    historyActivationKey,
    maxHistoryLength,
    ROTATION_KEYWORD,
  }) {
    this.$historyList = selector(`.${HISTORY_LIST}`);

    this.historyListKey = historyListKey;
    this.historyActivationKey = historyActivationKey;
    this.maxLength = maxHistoryLength;

    this.ROTATION_KEYWORD = ROTATION_KEYWORD;

    this.init();
  }

  init() {
    const isHistoryActive = this.getHistoryActivationState();
    if (!isHistoryActive) {
      selector(`.${HISTORY_ONOFF_BTN}`).textContent = '최근검색어켜기';
      this.setHistoryItems();
    }

    this.renderHistoryItems();
    this.$historyList.addEventListener('click', this.handleClickDelBtn);

    const $clearBtn = selector(`.${HISTORY_CLEAR_BTN}`);
    $clearBtn.addEventListener('click', this.handleClickClearBtn);

    const $onoffBtn = selector(`.${HISTORY_ONOFF_BTN}`);
    $onoffBtn.addEventListener('click', this.handleClickActivateBtn);
  }

  /* **리스너*** */
  handleClickClearBtn = (e) => {
    this.clearHistory();
    this.$historyList.innerHTML = '';
  };

  handleClickDelBtn = (e) => {
    const $target = e.target;
    if (!$target.classList.contains(HISTORY_ITEM_DEL_BTN)) return;
    const $item = $target.closest(`.${HISTORY_ITEM}`);
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

  setHistoryItems() {
    const $historyList = this.$historyList;
    const $historyWrapper = $historyList.parentNode;
    const $historyTitle = selector(`.${HISTORY_TITLE}`, $historyWrapper);
    const $historyOffTitle = selector(`.${HISTORY_OFF_TITLE}`, $historyWrapper);

    toggleClass(DISPLAY_NONE, $historyList);
    toggleClass(DISPLAY_NONE, $historyTitle);
    toggleClass(DISPLAY_NONE, $historyOffTitle);
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
    const $historyItem = createElement('li', HISTORY_ITEM, {
      'data-id': id,
    });

    const $historyItemLink = createElement(
      'a',
      [HISTORY_ITEM_LINK, this.ROTATION_KEYWORD],
      {
        href: `./search.html?q=${keyword}`,
      }
    );
    $historyItemLink.textContent = keyword;

    const $historyDelBtn = createElement('span', HISTORY_ITEM_DEL_BTN);
    $historyDelBtn.textContent = '삭제';

    $historyItem.appendChild($historyItemLink);
    $historyItem.appendChild($historyDelBtn);
    return $historyItem;
  }

  removeHistoryItemElement($item) {
    this.$historyList.removeChild($item);
  }

  removeHistoryItemElementById(id) {
    const $item = selector(`.${HISTORY_ITEM}[data-id='${id}']`);

    if (!$item) return false;
    this.$historyList.removeChild($item);
    return true;
  }

  setHistory(id, value) {
    const isHistoryActive = this.getHistoryActivationState();
    if (!isHistoryActive) return;

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
