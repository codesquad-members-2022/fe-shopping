import {RecentSearchController} from './controller/recentSearchController.js';
import {RelativeSearchController} from './controller/relativeSearchController.js';
import {fetchData} from './util/util.js';

const goodsData = await fetchData('goodsData');
const firstKeyword = '아';
const keywordsData = goodsData[firstKeyword];

init();

function init() {
  window.localStorage.clear();
  const recentSearchController = new RecentSearchController();
  const relativeSearchController = new RelativeSearchController(keywordsData);
  recentSearchController.addInputFocusEvent();
  recentSearchController.addInputKeyDownEvent();
  relativeSearchController.addInputKeyUpEvent();
}
