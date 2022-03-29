import { getData } from '../utils/getData.js';

import SearchModel from './model/SearchModel.js';

import initCategory from './category/main.js';
import initHistory from './history/main.js';

import AutoCompleteView from './view/AutoCompleteView.js';
import InputView from './view/InputView.js';

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
  initHistory(searchModel);

  const autoCompleteView = new AutoCompleteView({ model: searchModel });
  const inputView = new InputView({ model: searchModel });

  const autoCompleteController = new AutoCompleteController({
    model: searchModel,
    view: autoCompleteView,
  });

  const inputController = new InputController({
    model: searchModel,
    view: inputView,
    //historyView: historyView,
    autoCompleteView: autoCompleteView,
  });

  autoCompleteController.init();
  inputController.init();
}
