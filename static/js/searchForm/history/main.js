import HistoryView from './HistoryView.js';
import HistoryController from './HistoryController.js';

export default async function initHistory(searchModel) {
  const historyView = new HistoryView();
  const historyController = new HistoryController({
    model: searchModel,
    view: historyView,
  });

  historyController.init();
}
