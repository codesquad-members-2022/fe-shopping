import { ToggleView } from "./AbstractToggleView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import * as fetchUtil from "../util/fetchutil.js";
import { Toggle } from "../Components/AbstractToggle.js";

function SearchInputToggleView() {
  ToggleView.apply(this, arguments);
  this.emptyHistoryContents = ["검색 결과 없음"];
  this.searchHistoryData = new Set();
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

SearchInputToggleView.prototype.checkHistory = function () {
  const localHistoryObj = localStorage.getItem("localSearchHistory");
  const searchHistory = Array.from(localHistoryObj); // 나중에 Set으로? 로컬히스토리 자체에서 Set실패

  if (this.isEmptyArr(searchHistory)) {
    return this.emptyHistoryContents;
  }

  return searchHistory;
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
  if (this.checkEnter(keyCode)) {
    return;
  }

  this.searchHistoryData.add(value);
  this.Save2LocalStorage(this.searchHistoryData);
};

SearchInputToggleView.prototype.checkEnter = function (keyCode) {
  if (keyCode === 13) {
    return true;
  }
};

SearchInputToggleView.prototype.Save2LocalStorage = function (data) {
  localStorage.setItem(
    "localSearchHistory",
    JSON.stringify(Array.from(data)) // 왜 ... 스프레드 문법은 안될까?
  );
};

// SearchInputToggleView.prototype.renderHistory = function () {
//   if (!domUtil.$(".search--toggle--ul").innerHTML === "") {
//     return;
//   }
//   if (this.searchHistory.length === 0) {
//     this.renderNoHistory();
//     return;
//   }

//   const historyDom = new SearchInputToggle(this.historyDom).dom;
//   this.renderToggle(historyDom);
// };

// SearchInputToggleView.prototype.renderNoHistory = function () {
//   const childDom = new SearchInputToggle(["검색 기록이 없습니다."]).dom;
//   this.renderToggle(childDom);
// };

export { SearchInputToggleView, SearchMenuToggleView };
