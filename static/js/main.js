import {RecentSearchData} from './model/recentSearchData.js';
import {RecentSearchView} from './view/recentSearchView.js';
import {RecentSearchController} from './controller/recentSearchController.js';

const localStorage = window.localStorage;
const recentSearchData = new RecentSearchData(localStorage);
const recentSearchView = new RecentSearchView(recentSearchData.keywordList);
const recentSearchController = new RecentSearchController(recentSearchData, recentSearchView);
recentSearchController.addInputFocusEvent();
recentSearchController.addInputKeyupEvent();
