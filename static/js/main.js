import {SearchBarController} from './controller/searchBarController.js';
import {SearchCategoryView} from './view/searchCategoryView.js'

init();

function init() {
  const searchCategoryView = new SearchCategoryView();
  const searchBarController = new SearchBarController();
  searchCategoryView.init();
  searchBarController.init();
}
