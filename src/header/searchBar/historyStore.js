import { webStorage } from '../../utils/utils.js';

export const historyStore = {
  historyListKey: 'HistoryList',
  historyActivationKey: 'isHistoryActive',
  maxHistoryLength: 9,

  setItem(id, value) {
    if (!this.isHistoryActive()) return;

    const prevItems = this.getAllItems();
    const prevIds = Object.keys(prevItems).filter((_id) => {
      if (prevItems[_id] !== value) return true;
      delete prevItems[_id];
      return false;
    });

    if (prevIds.length === this.maxHistoryLength) {
      const firstId = prevIds[0];
      delete prevItems[firstId];
    }

    prevItems[id] = value;
    webStorage.set(this.historyListKey, prevItems);
  },

  getAllItems() {
    return webStorage.get(this.historyListKey) ?? {};
  },

  removeItem(id) {
    const prevItems = this.getAllItems();
    if (!prevItems) return false;

    delete prevItems[id];
    webStorage.set(this.historyListKey, prevItems);
    return true;
  },

  clear() {
    webStorage.clear(this.historyListKey);
  },

  activateHistory() {
    webStorage.set(this.historyActivationKey, true);
  },

  stopHistory() {
    webStorage.set(this.historyActivationKey, false);
  },

  isHistoryActive() {
    return webStorage.get(this.historyActivationKey) ?? true;
  },
};
