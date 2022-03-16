import { webStorage } from '../../utils/utils.js';

export class History {
  constructor({
    $form,
    $input,
    $clearBtn,
    $historyList,
    delBtnClassName,
    storageKey,
    maxHistoryLength,
    historyItemSelector,
  }) {
    this.$form = $form;
    this.$input = $input;
    this.$clearBtn = $clearBtn;
    this.$list = $historyList;
    this.delBtnClassName = delBtnClassName;
    this.key = storageKey;
    this.maxLength = maxHistoryLength;
    this.itemSelector = historyItemSelector;

    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();

      const word = this.$input.value;
      if (word === '') return;
      this.$input.value = '';
      this.setHistory(Date.now(), word);
      console.log(this.getHistory());
    });

    this.$clearBtn.addEventListener('click', () => {
      this.clear();
    });

    this.$list.addEventListener('click', (e) => {
      const $target = e.target;
      if (!$target.classList.contains(this.delBtnClassName)) return;

      const $item = $target.closest(this.itemSelector);
      console.log($item);
    });
  }

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
