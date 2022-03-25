import { dom } from '../../utils/dom.js';

export default class InputView {
  constructor({ model }) {
    this.model = model;
    this.inputEl = dom.select('.searchForm__input');
    this.resultEl = dom.select('.searchForm__result');
    this.submitButtonEl = dom.select('.searchForm__submit');
  }

  init() {
    this.addHandler();
  }

  addHandler() {
    this.inputEl.addEventListener('focus', () => this.toggleResult());
    this.inputEl.addEventListener('blur', () => this.toggleResult());
    this.submitButtonEl.addEventListener('click', (event) => this.submitInputValue(event));
  }

  focus() {
    this.inputEl.focus();
  }

  clear() {
    this.inputEl.value = '';
  }
}
