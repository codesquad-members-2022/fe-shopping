import { getData } from '../utils/getData.js';
import SearchModel from './model/SearchModel.js';
import CategoryView from './view/CategoryView.js';

export async function initSearchForm() {
  const user = await getData('data', 'user');
  const searchCategories = await getData('data', 'searchCategories');

  const searchModel = new SearchModel({
    mode: user.mode,
    categories: searchCategories,
    currentCategory: searchCategories[0],
    inputValue: '',
  });
  const categoryView = new CategoryView(searchModel);
  //ResultView
  //InputView

  categoryView.init();
}
