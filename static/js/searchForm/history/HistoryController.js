export default class HistoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
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
  }

  clearHistory() {
    const emptyHistory = [];
    this.model.clearHistory();
    this.view.renderHistory(emptyHistory);
  }
}
