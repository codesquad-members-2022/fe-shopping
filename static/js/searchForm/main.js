import { getData } from '../utils/getData.js';

import SearchModel from './model/SearchModel.js';

import CategoryView from './view/CategoryView.js';
import InputView from './view/InputView.js';

import CategoryController from './controller/CategoryController.js';
import InputController from './controller/InputController.js';

export async function initSearchForm() {
  const user = await getData('http://127.0.0.1:3000/', 'data', 'user');
  const searchCategories = await getData('http://127.0.0.1:3000/', 'data', 'searchCategories');

  const searchModel = new SearchModel({
    mode: user.mode,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  });

  const inputView = new InputView({ model: searchModel });
  const categoryView = new CategoryView({ model: searchModel });
  const inputController = new InputController({ model: searchModel, view: inputView });
  const categoryController = new CategoryController({
    model: searchModel,
    view: categoryView,
  });

  inputController.init();
  categoryController.init();
}
