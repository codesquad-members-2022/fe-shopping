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
    this.bindMethods();
    this.view.addHandler();
  }

  bindMethods() {
    this.view.bound.showResult = this.showResult.bind(this);
    this.view.bound.hideResult = this.hideResult.bind(this);
    this.view.bound.submitInputValue = this.submitInputValue.bind(this);
  }

  showResult() {
    this.resultEl.classList.replace(this.hidden, this.show);
  }

  hideResult() {
    this.resultEl.classList.replace(this.show, this.hidden);
  }

  getInputValue() {
    return this.inputEl.value;
  }

  submitInputValue(event) {
    event.preventDefault();

    const inputValue = this.getInputValue();
    if (!inputValue) return;

    this.view.clear();
    this.inputEl.blur();
  }
}
