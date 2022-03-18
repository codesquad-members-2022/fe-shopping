import {RecentSearchModel} from './model/recentSearchModel.js';
import {RecentSearchView} from './view/recentSearchView.js';
import {RecentSearchController} from './controller/recentSearchController.js';

const localStorage = window.localStorage;
const recentSearchModel = new RecentSearchModel(localStorage);
const recentSearchView = new RecentSearchView();
const recentSearchController = new RecentSearchController(recentSearchModel, recentSearchView);
recentSearchController.addInputFocusEvent();
recentSearchController.addInputFocusOutEvent();
recentSearchController.addInputKeyupEvent();
