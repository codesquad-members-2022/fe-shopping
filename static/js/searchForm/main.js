import { getData } from '../utils/getData.js';
import SearchModel from './model/SearchModel.js';
import CategoryView from './view/CategoryView.js';

export async function initSearchForm() {
  const user = await getData('http://127.0.0.1:3000/', 'data', 'user');
  const searchCategories = await getData('http://127.0.0.1:3000/', 'data', 'searchCategories');

  const searchModel = new SearchModel({
    mode: user.mode,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  });
  const categoryView = new CategoryView(searchModel);
  //ResultView
  //InputView

  categoryView.init();
}
