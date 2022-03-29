import { getData } from '../utils/getData.js';

import SearchModel from './model/SearchModel.js';

import initCategory from './category/main.js';

import HistoryView from './view/HistoryView.js';
import AutoCompleteView from './view/AutoCompleteView.js';
import InputView from './view/InputView.js';

import HistoryController from './controller/HistoryController.js';
import AutoCompleteController from './controller/AutoCompleteController.js';
import InputController from './controller/InputController.js';

export async function initSearchForm() {
  const user = await getData('http://127.0.0.1:3000/', 'data', 'user');
  const searchCategories = await getData('http://127.0.0.1:3000/', 'data', 'searchCategories');

  const searchModel = new SearchModel({
    mode: user.mode,
    history: user.history,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  });

  initCategory(searchModel);

  const historyView = new HistoryView({ model: searchModel });
  const autoCompleteView = new AutoCompleteView({ model: searchModel });
  const inputView = new InputView({ model: searchModel });

  const historyController = new HistoryController({
    model: searchModel,
    view: historyView,
  });

  const autoCompleteController = new AutoCompleteController({
    model: searchModel,
    view: autoCompleteView,
  });

  const inputController = new InputController({
    model: searchModel,
    view: inputView,
    historyView: historyView,
    autoCompleteView: autoCompleteView,
  });

  historyController.init();
  autoCompleteController.init();
  inputController.init();
}
