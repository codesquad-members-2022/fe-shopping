import { getData } from '../utils/getData.js';
import SearchModel from './model/SearchModel.js';
import CategoryView from './view/CategoryView.js';
import CategoryController from './controller/CategoryController.js';

export async function initSearchForm() {
  const user = await getData('http://127.0.0.1:3000/', 'data', 'user');
  const searchCategories = await getData('http://127.0.0.1:3000/', 'data', 'searchCategories');

  const searchModel = new SearchModel({
    mode: user.mode,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  });
  //ResultView
  //InputView
  const categoryView = new CategoryView({ model: searchModel });
  const categoryController = new CategoryController({
    model: searchModel,
    view: categoryView,
  });

  categoryController.init();
}
