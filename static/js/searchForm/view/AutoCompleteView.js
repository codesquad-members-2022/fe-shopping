import { dom } from '../../utils/dom.js';

export default class AutoCompleteView {
  constructor({ model }) {
    this.model = model;
    this.autoCompleteEl = dom.select('.searchForm__autoComplete');
    this.listEl = dom.select('.searchForm__autoComplete-list');
  }

  init() {
    this.addHandler();
  }

  addHandler() {}

  createItem(value) {
    return `<li class="searchForm__autoComplete-item">${value}</li>`;
  }

  createItems() {
    const autoCompleteWords = this.model.getAutoCompleteWords();
    return autoCompleteWords.reduce((acc, word) => acc + this.createItem(word), '');
  }

  renderAutoComplete() {
    dom.initEl(this.listEl);
    this.listEl.insertAdjacentHTML('beforeend', this.createItems());
  }
}
