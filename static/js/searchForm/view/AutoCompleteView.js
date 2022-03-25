import { dom } from '../../utils/dom.js';

export default class AutoCompleteView {
  constructor({ model }) {
    this.model = model;
    this.autoCompleteEl = dom.select('.searchForm__autoComplete');
    this.listEl = dom.select('.searchForm__autoComplete-list');
  }

  createItem(value) {
    return `<li class="searchForm__autoComplete-item">${value}</li>`;
  }

  createItems() {
    const autoCompleteWords = this.model.getAutoCompleteWords();
    return autoCompleteWords.reduce((acc, word) => acc + this.createItem(word), '');
  }

  async renderAutoComplete(category, inputValue) {
    await this.requestAutoCompleteWords(category, inputValue);

    dom.initEl(this.listEl);
    this.listEl.insertAdjacentHTML('beforeend', this.createItems());

    this.showAutoComplete();
  }
}
