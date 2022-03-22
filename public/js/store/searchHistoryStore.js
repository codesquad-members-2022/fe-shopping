import { MAX_RECENT_SEARCH_SIZE } from '../constants/index.js';
import Store from './store.js';

class SearchHistoryStore extends Store {

  #key = 'searchHistory';

  constructor() {
    super();
    this.setState(this.#key, JSON.parse(localStorage.getItem(this.#key)) || []);
  }

  addHistory(value) {
    const values = this.getState(this.#key);

    if (values) values.length === MAX_RECENT_SEARCH_SIZE && values.pop();

    localStorage.setItem(this.#key, JSON.stringify([value, ...values]));
    this.setState(this.#key, value);
  }

  getHistory() {
    return this.getState(this.#key);
  }

  clearHistory() {
    localStorage.removeItem(this.#key);
    this.clearState(this.#key);
  }
}

export default new SearchHistoryStore();
