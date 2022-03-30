export default class InputController {
  constructor({ model, view, historyView, autoCompleteView }) {
    this.model = model;
    this.inputView = view;
    this.historyView = historyView;
    this.autoCompleteView = autoCompleteView;

    this.inputEl = view.inputEl;
    this.resultEl = view.resultEl;
    this.autoCompleteTimerId;
    this.show = "searchForm__result--show";
    this.hidden = "searchForm__result--hidden";
  }

  init() {
    this.inputView.addHandler();
    this.bindMethods();
  }

  bindMethods() {
    this.inputView.bound.isHistoryEmpty = this.isHistoryEmpty.bind(this);
    this.inputView.bound.resetResult = this.resetResult.bind(this);
    this.inputView.bound.showResult = this.showResult.bind(this);
    this.inputView.bound.hideResult = this.hideResult.bind(this);
    this.inputView.bound.setAutoCompleteTimer = this.setAutoCompleteTimer.bind(this);
    this.inputView.bound.clearAutoCompleteTimer = this.clearAutoCompleteTimer.bind(this);
    this.inputView.bound.submitInputValue = this.submitInputValue.bind(this);
  }

  resetResult() {
    this.historyView.bound.showHistory();
    this.autoCompleteView.bound.hideAutoComplete();
    this.autoCompleteView.bound.clearAutoComplete();
  }
  isHistoryEmpty() {
    return this.model.getHistory().length === 0;
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
    this.historyView.renderHistory(this.model.getHistory());
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
      this.historyView.bound.hideHistory();
    }, 500);
  }

  clearAutoCompleteTimer() {
    clearTimeout(this.autoCompleteTimerId);
  }
}
