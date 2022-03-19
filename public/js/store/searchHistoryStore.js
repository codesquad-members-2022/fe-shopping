import { MAX_RECENT_SEARCH_SIZE } from '../constants/index.js';
import Store from './store.js';

class SearchHistoryStore extends Store {

  addHistory(key, value) {
    const values = JSON.parse(localStorage.getItem(key));

    if (values) {
      values.length === MAX_RECENT_SEARCH_SIZE && values.pop();
      localStorage.setItem(key, JSON.stringify([value, ...values]));
      this.state[key] = [value, ...values];
    }

    else {
      localStorage.setItem(key, JSON.stringify([value]));
      this.state[key] = [value];
    }
  }

  getHistory(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearHistory(key) {
    localStorage.removeItem(key);
    this.state[key] = [];
  }
}

export default new SearchHistoryStore();
