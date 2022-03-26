import { dom } from '../../utils/dom.js';

export default class HistoryView {
  constructor({ model }) {
    this.model = model;
    this.historyEl = dom.select('.searchForm__history');
    this.listEl = dom.select('.searchForm__history-list');
    this.buttonClearEl = dom.select('.searchForm__history-button--clear');
  }

  init() {
    this.renderHistory();
    this.addHandler();
  }

  addHandler() {
    this.buttonClearEl.addEventListener('mousedown', () => this.clearHistory());
  }

  createItem(value) {
    return `<li class="searchForm__history-item">${value}</li>`;
  }

  createItems() {
    const history = this.model.getHistory();
    return history.reduce((acc, value) => this.createItem(value) + acc, '');
  }

  renderHistory() {
    dom.initEl(this.listEl);
    this.listEl.insertAdjacentHTML('beforeend', this.createItems());
  }
}
