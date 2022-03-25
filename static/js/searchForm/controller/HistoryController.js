export default class HistoryController {
  constructor({ model, view }) {
    this.model = model;
    this.historyView = view;
    this.state = this.model.historyMode;
  }

  init() {
    this.historyView.init();
    this.historyView.clearHistory = this.clearHistory.bind(this);
  }

  clearHistory() {
    this.model.clearHistory();
    this.historyView.renderHistory();
  }
}
