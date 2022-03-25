import { getData } from '../utils/getData.js';

import SearchModel from './model/SearchModel.js';

import CategoryView from './view/CategoryView.js';
import HistoryView from './view/HistoryView.js';
import AutoCompleteView from './view/AutoCompleteView.js';
import InputView from './view/InputView.js';

import CategoryController from './controller/CategoryController.js';
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

  const inputView = new InputView({ model: searchModel });
  const categoryView = new CategoryView({ model: searchModel });
  const historyView = new HistoryView({ model: searchModel });
  const autoCompleteView = new AutoCompleteView({ model: searchModel });

  const inputController = new InputController({
    model: searchModel,
    view: inputView,
    historyView: historyView,
  });
  const categoryController = new CategoryController({
    model: searchModel,
    view: categoryView,
  });
  const historyController = new HistoryController({
    model: searchModel,
    view: historyView,
  });

  inputController.init();
  const autoCompleteController = new AutoCompleteController({
    model: searchModel,
    view: autoCompleteView,
  });
  categoryController.init();
  historyController.init();
  autoCompleteController.init();
}
