export default class InputController {
  constructor({ model, view, historyView }) {
    this.model = model;
    this.inputView = view;
    this.historyView = historyView;
    this.inputEl = view.inputEl;
    this.resultEl = view.resultEl;
    this.show = 'searchForm__result--show';
    this.hidden = 'searchForm__result--hidden';
  }

  init() {
    this.inputView.init();
    this.inputView.showResult = this.showResult.bind(this);
    this.inputView.hideResult = this.hideResult.bind(this);
    this.inputView.submitInputValue = this.submitInputValue.bind(this);
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

    this.model.setHistory(inputValue);
    this.historyView.renderHistory();
    this.inputView.clear();
    this.inputEl.blur();
  }
}
