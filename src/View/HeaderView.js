import { ToggleView } from "./AbstractToggleView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import * as fetchUtil from "../util/fetchutil.js";
import { Toggle } from "../Components/AbstractToggle.js";

function SearchInputToggleView(reomoveHistoryBtn) {
  ToggleView.apply(this, arguments);
  this.emptyHistoryContents = ["검색 결과 없음"];
  this.searchHistoryData = new Set(
    JSON.parse(localStorage.getItem("localSearchHistory"))
  );
  this.reomoveHistoryBtn = domUtil.$(reomoveHistoryBtn);
}

function SearchMenuToggleView() {
  ToggleView.apply(this, arguments);
}

SearchInputToggleView.prototype = Object.create(ToggleView.prototype);
SearchMenuToggleView.prototype = Object.create(ToggleView.prototype);

SearchMenuToggleView.prototype.renderToggle = async function (inputValue) {
  const searchMenuToggleData = await fetchUtil.fetchData("search/menu/toggle");
  this.generateMenuContents(searchMenuToggleData);
};

SearchMenuToggleView.prototype.generateMenuContents = function (data) {
  const prevMenuClassName = ".search--menu--ul";
  if (this.removePrevView(prevMenuClassName)) {
    return;
  }

  const searchZoneToggle = new SearchMenuToggle(data);
  this.parentDom.appendChild(searchZoneToggle.dom);
};

SearchMenuToggleView.prototype.clickedOutMenu = function (className) {
  const menuClass = [
    "search--menu--ul",
    "search--menu--li",
    "header__main--inputMenuButton",
    "header__main--inputMenu",
  ];
  if (menuClass.includes(className)) {
    return;
  }

  this.removePrevView(".search--menu--ul");
};

SearchInputToggleView.prototype.renderAutoComplete = async function (
  inputValue
) {
  const autocompleteToggleData = await fetchUtil.fetchData(
    `search/${inputValue}`
  );
  this.generateSearchContents(autocompleteToggleData);
};

SearchInputToggleView.prototype.renderHistory = function () {
  if (this.hasHistoryZone()) {
    return;
  }
  const searchHistory = this.checkHistory();

  this.generateSearchContents(searchHistory);
};

SearchInputToggleView.prototype.removeHistory = function () {
  this.searchHistoryData.clear();
  localStorage.clear();
  this.renderHistory();
};

SearchInputToggleView.prototype.checkHistory = function () {
  if (this.searchHistoryData.size <= 0) {
    return this.emptyHistoryContents;
  }

  return [...this.searchHistoryData];
};

SearchInputToggleView.prototype.isEmptyArr = function (arr) {
  if (!Array.isArray(arr) || arr.length <= 0) {
    return true;
  }
};

SearchInputToggleView.prototype.generateSearchContents = function (data) {
  if (this.isEmptyArr(data)) {
    return;
  }

  const prevClassName = ".search--toggle--ul";
  this.removePrevView(prevClassName);

  const searchZoneToggle = new SearchInputToggle(data);
  this.parentDom.appendChild(searchZoneToggle.dom);
};

SearchInputToggleView.prototype.hasHistoryZone = function () {
  const childDomClassName = ".search--toggle--ul";
  if (domUtil.target$(this.parentDom, childDomClassName)) {
    return true; // 이부분 에러면 querySelector 결과가 undefined라 에러임
  }

  return false;
};

SearchInputToggleView.prototype.saveSearchingData = function (event) {
  const {
    keyCode,
    target: { value },
  } = event;

  // keyCode === 13 ? event.preventDefault() : return 삼항연산자좀 써볼걸... 안되네
  if (this.isNotEnter(keyCode, event)) {
    return;
  }
  this.checkHistorySize();
  this.Save2LocalStorage(value);
};

SearchInputToggleView.prototype.isNotEnter = function (keyCode, event) {
  if (keyCode !== 13) {
    return true;
  } else {
    event.preventDefault();
  }
};

SearchInputToggleView.prototype.checkHistorySize = function () {
  const localHistoryArr = [...this.searchHistoryData];
  const MAX_SIZE = 10;

  if (this.searchHistoryData.size >= MAX_SIZE) {
    this.searchHistoryData.delete(localHistoryArr[0]);
  }
};

SearchInputToggleView.prototype.Save2LocalStorage = function (data) {
  this.searchHistoryData.add(data);
  const reverseData = Array.from(this.searchHistoryData).reverse();
  localStorage.setItem("localSearchHistory", JSON.stringify(reverseData));
};

export { SearchInputToggleView, SearchMenuToggleView };
