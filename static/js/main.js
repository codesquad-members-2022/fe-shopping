import {SearchBarController} from './controller/searchBarController.js';

init();

function init() {
  const searchBarController = new SearchBarController();
  searchBarController.init();
}
