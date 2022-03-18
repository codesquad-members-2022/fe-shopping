import {RecentSearchController} from './controller/recentSearchController.js';
import {RelativeSearchController} from './controller/relativeSearchController.js';
import {keywordsData} from './data/relativeSearchData.js';

init();

function init() {
  window.localStorage.clear();
  const recentSearchController = new RecentSearchController();
  const relativeSearchController = new RelativeSearchController(keywordsData);
  recentSearchController.addInputFocusEvent();
  recentSearchController.addInputKeyDownEvent();
  relativeSearchController.addInputKeyUpEvent();
}
