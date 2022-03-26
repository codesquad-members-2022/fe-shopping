import { MAX_RECENT_SEARCH_SIZE } from '../constants/index.js';
import Store from './store.js';

class SearchHistoryStore extends Store {

  #key = 'searchHistory';

  constructor() {
    super();
    const isSaveHistoryOn = JSON.parse(localStorage.getItem('isSaveHistoryOn'));
    this.setState('isSaveHistoryOn', isSaveHistoryOn === null ? true : isSaveHistoryOn);
    this.setState(this.#key, JSON.parse(localStorage.getItem(this.#key)) || []);
  }

  addHistory(value) {
    const values = this.getState(this.#key).filter(state => state.item !== value.item);

    if (values) values.length === MAX_RECENT_SEARCH_SIZE && values.pop();

    localStorage.setItem(this.#key, JSON.stringify([value, ...values]));
    this.setState(this.#key, [value, ...values]);
  }

  getHistory() {
    return this.getState(this.#key);
  }

  clearHistory() {
    localStorage.removeItem(this.#key);
    this.clearState(this.#key);
  }

  isSaveHistoryOn() {
    return this.getState('isSaveHistoryOn');
  }

  toggleSaveHistory() {
    localStorage.setItem('isSaveHistoryOn', JSON.stringify(!this.getState('isSaveHistoryOn')));
    this.setState('isSaveHistoryOn', !this.getState('isSaveHistoryOn'));
  }
}

export default new SearchHistoryStore();
