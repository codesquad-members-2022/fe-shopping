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
    this.inputEl.addEventListener('input', (event) => {
      if (event.target.value === '') {
        this.clearAutoCompleteTimer();
        this.resetResult();
        this.hideResult();
        return;
      }
      this.setAutoCompleteTimer(event);
    });
    this.inputEl.addEventListener('focus', () => {
      if (this.model.getHistory().length === 0) return;
      this.showResult();
    });
    this.inputEl.addEventListener('blur', () => this.hideResult());
    this.submitButtonEl.addEventListener('click', (event) => this.submitInputValue(event));
  }

  clear() {
    this.inputEl.value = '';
  }
}
