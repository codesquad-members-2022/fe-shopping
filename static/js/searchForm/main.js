import { getData } from '../utils/getData.js';

import SearchModel from './model/SearchModel.js';

import initCategory from './category/main.js';
import initHistory from './history/main.js';
import initAutoComplete from './autoComplete/main.js';
import initInput from './input/main.js';

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
  initAutoComplete(searchModel);
  initInput(searchModel);
}
