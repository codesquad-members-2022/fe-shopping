export default class InputController {
  constructor({ model, view, historyView, autoCompleteView }) {
    this.model = model;
    this.inputView = view;
    this.historyView = historyView;
    this.autoCompleteView = autoCompleteView;
    this.autoCompleteTimerId;
  }

  init() {
    this.inputView.addHandler();
    this.bindMethods();
  }

  bindMethods() {
    this.inputView.bound.isHistoryEmpty = this.isHistoryEmpty.bind(this);
    this.inputView.bound.resetResult = this.resetResult.bind(this);
    this.inputView.bound.setAutoCompleteTimer = this.setAutoCompleteTimer.bind(this);
    this.inputView.bound.clearAutoCompleteTimer = this.clearAutoCompleteTimer.bind(this);
    this.inputView.bound.submitInputValue = this.submitInputValue.bind(this);
  }

  resetResult() {
    this.historyView.showHistory();
    this.autoCompleteView.hideAutoComplete();
    this.autoCompleteView.clearAutoComplete();
  }
  isHistoryEmpty() {
    return this.model.getHistory().length === 0;
  }

  submitInputValue(event) {
    event.preventDefault();

    this.clearAutoCompleteTimer();
    const inputValue = this.inputView.getInputValue();
    if (!inputValue) return;

    this.model.setHistory(inputValue);
    this.historyView.renderHistory(this.model.getHistory());
    this.resetResult();

    this.inputView.clear();
    this.inputView.blur();
  }

  setAutoCompleteTimer(ms) {
    this.clearAutoCompleteTimer();

    this.autoCompleteTimerId = setTimeout(() => {
      const category = this.model.getCurrentCategory();
      const inputValue = this.inputView.getInputValue();
      this.autoCompleteView.renderAutoComplete(category, inputValue);

      this.inputView.showResult();
      this.historyView.hideHistory();
    }, ms);
  }

  clearAutoCompleteTimer() {
    clearTimeout(this.autoCompleteTimerId);
  }
}
