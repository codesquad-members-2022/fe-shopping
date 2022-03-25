export default class InputController {
  constructor({ model, view, historyView }) {
    this.model = model;
    this.view = view;
    this.historyView = historyView;
    this.inputEl = view.inputEl;
    this.resultEl = view.resultEl;
    this.show = 'searchForm__result--show';
    this.hidden = 'searchForm__result--hidden';
  }

  init() {
    this.view.init();
    this.view.toggleResult = this.toggleResult.bind(this);
    this.view.submitInputValue = this.submitInputValue.bind(this);
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

  submitInputValue(event) {
    event.preventDefault();
    const inputValue = this.getInputValue();
    this.model.setHistory(inputValue);
    this.historyView.renderHistory();
    this.view.clear();
  }
}
