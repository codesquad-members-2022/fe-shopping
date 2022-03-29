export default class HistoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.historyEl = view.historyEl;
    this.show = 'searchForm__history--show';
    this.hidden = 'searchForm__history--hidden';
  }

  init() {
    this.initView();
    this.bindMethods();
    this.view.addHandler();
  }

  initView() {
    const history = this.model.getHistory();
    this.view.renderHistory(history);
  }

  bindMethods() {
    this.view.bound.clearHistory = this.clearHistory.bind(this);
    this.view.bound.showHistory = this.showHistory.bind(this);
    this.view.bound.hideHistory = this.hideHistory.bind(this);
  }

  clearHistory() {
    const emptyHistory = [];
    this.model.clearHistory();
    this.view.renderHistory(emptyHistory);
  }

  showHistory() {
    this.historyEl.classList.replace(this.hidden, this.show);
  }

  hideHistory() {
    this.historyEl.classList.replace(this.show, this.hidden);
  }
}
