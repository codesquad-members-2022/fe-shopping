import { dom } from '../../utils/dom.js';

export default class InputView {
  constructor() {
    this.bound = {};
    this.inputEl = dom.select('.searchForm__input');
    this.resultEl = dom.select('.searchForm__result');
    this.submitButtonEl = dom.select('.searchForm__submit');
  }

  addHandler() {
    this.inputEl.addEventListener('focus', () => this.bound.showResult());
    this.inputEl.addEventListener('blur', () => this.bound.hideResult());
    this.submitButtonEl.addEventListener('click', (event) => this.bound.submitInputValue(event));
  }

  clear() {
    this.inputEl.value = '';
  }
}
