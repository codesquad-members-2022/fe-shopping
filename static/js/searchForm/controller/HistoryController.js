export default class HistoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.historyEl = view.historyEl;
    this.show = 'searchForm__history--show';
    this.hidden = 'searchForm__history--hidden';
    this.state = this.model.historyMode;
  }

  init() {
    this.view.init();
    this.view.clearHistory = this.clearHistory.bind(this);
    this.view.showHistory = this.showHistory.bind(this);
    this.view.hideHistory = this.hideHistory.bind(this);
  }

  clearHistory() {
    this.model.clearHistory();
    this.view.renderHistory();
  }

  showHistory() {
    this.historyEl.classList.replace(this.hidden, this.show);
  }

  hideHistory() {
    this.historyEl.classList.replace(this.show, this.hidden);
  }
}
