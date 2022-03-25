export default class InputController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.inputEl = view.inputEl;
    this.resultEl = view.resultEl;
    this.show = 'searchForm__result--show';
    this.hidden = 'searchForm__result--hidden';
  }

  init() {
    this.view.init();
    this.view.toggleResult = this.toggleResult.bind(this);
    this.view.getInputValue = this.getInputValue.bind(this);
  }

  toggleResult() {
    if (this.resultEl.classList.contains(this.show)) {
      this.resultEl.classList.replace(this.show, this.hidden);
      return;
    }
    this.resultEl.classList.replace(this.hidden, this.show);
  }

  getInputValue() {
    return this.inputEl.value;
  }
}
