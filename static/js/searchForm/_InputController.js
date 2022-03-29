export default class InputController {
  constructor({ model, view, historyView, autoCompleteView }) {
    this.model = model;
    this.inputView = view;
    this.historyView = historyView;
    this.autoCompleteView = autoCompleteView;
    this.inputEl = view.inputEl;
    this.resultEl = view.resultEl;
    this.show = 'searchForm__result--show';
    this.hidden = 'searchForm__result--hidden';
    this.autoCompleteTimerId;
  }

  init() {
    this.inputView.init();
    this.inputView.resetResult = this.resetResult.bind(this);
    this.inputView.showResult = this.showResult.bind(this);
    this.inputView.hideResult = this.hideResult.bind(this);
    this.inputView.setAutoCompleteTimer = this.setAutoCompleteTimer.bind(this);
    this.inputView.clearAutoCompleteTimer = this.clearAutoCompleteTimer.bind(this);
    this.inputView.submitInputValue = this.submitInputValue.bind(this);
  }

  resetResult() {
    this.historyView.showHistory();
    this.autoCompleteView.hideAutoComplete();
    this.autoCompleteView.clearAutoComplete();
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

    this.clearAutoCompleteTimer();
    const inputValue = this.getInputValue();
    if (!inputValue) return;

    this.model.setHistory(inputValue);
    this.historyView.renderHistory();
    this.resetResult();

    this.inputView.clear();
    this.inputEl.blur();
  }

  setAutoCompleteTimer(event) {
    this.clearAutoCompleteTimer();

    this.autoCompleteTimerId = setTimeout(() => {
      const category = this.model.getCurrentCategory();
      const inputValue = event.target.value;
      this.autoCompleteView.renderAutoComplete(category, inputValue);

      this.showResult();
      this.historyView.hideHistory();
    }, 500);
  }

  clearAutoCompleteTimer() {
    clearTimeout(this.autoCompleteTimerId);
  }
}
