export default class HistoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.state = this.model.historyMode;
  }

  init() {
    this.view.init();
    this.view.clearHistory = this.clearHistory.bind(this);
  }

  clearHistory() {
    this.model.clearHistory();
    this.view.renderHistory();
  }

  showHistory() {}

  hideHistory() {}
}
