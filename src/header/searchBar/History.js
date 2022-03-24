import { createElement, selector, toggleClass } from '../../utils/utils.js';

import { historyStore } from './historyStore.js';

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
  constructor({ ROTATION_KEYWORD }) {
    this.$historyList = selector(`.${HISTORY_LIST}`);
    this.$historyTitle = selector(`.${HISTORY_TITLE}`);
    this.$historyOffTitle = selector(`.${HISTORY_OFF_TITLE}`);
    this.$clearBtn = selector(`.${HISTORY_CLEAR_BTN}`);
    this.$activationBtn = selector(`.${HISTORY_ONOFF_BTN}`);
    this.ROTATION_KEYWORD = ROTATION_KEYWORD;
    this.init();
  }

  init() {
    const isHistoryActive = historyStore.isHistoryActive();
    if (!isHistoryActive) {
      this.$activationBtn.textContent = '최근검색어켜기';
      this.toggleHistoryActivation();
    }

    this.renderHistoryItems();
    this.$historyList.addEventListener('click', this.handleClickDelBtn);
    this.$clearBtn.addEventListener('click', this.handleClickClearBtn);
    this.$activationBtn.addEventListener('click', this.handleClickActivationBtn);
  }

  /* **리스너*** */
  handleClickClearBtn = () => {
    historyStore.clear();
    this.$historyList.textContent = '';
  };

  handleClickDelBtn = (e) => {
    const $target = e.target;
    if (!$target.classList.contains(HISTORY_ITEM_DEL_BTN)) return;
    const $item = $target.closest(`.${HISTORY_ITEM}`);
    const itemId = $item.dataset.id;
    historyStore.removeItem(itemId);
    this.removeHistoryItemElement($item);
  };

  handleClickActivationBtn = () => {
    const isHistoryActive = historyStore.isHistoryActive();

    this.toggleHistoryActivation();
    if (isHistoryActive) {
      this.$activationBtn.textContent = '최근검색어켜기';
      historyStore.stopHistory();
      return;
    }

    this.$activationBtn.textContent = '최근검색어끄기';
    historyStore.activateHistory();
  };
  /* ********** */

  toggleHistoryActivation() {
    toggleClass(DISPLAY_NONE, this.$historyList);
    toggleClass(DISPLAY_NONE, this.$historyTitle);
    toggleClass(DISPLAY_NONE, this.$historyOffTitle);
  }

  renderHistoryItems() {
    const historyList = historyStore.getAllItems();
    const $$historyItem = Object.entries(historyList).map(([id, value]) =>
      this.createHistoryItemElement(id, value)
    );
    $$historyItem.reverse();
    this.$historyList.append(...$$historyItem);
  }

  removeHistoryItemElement($item) {
    this.$historyList.removeChild($item);
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
    $historyItem.append($historyItemLink, $historyDelBtn);

    return $historyItem;
  }
}
