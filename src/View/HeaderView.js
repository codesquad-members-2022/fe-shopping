import { ToggleView } from "./AbstractToggleView.js";
import { SearchInputToggle } from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import { Toggle } from "../Components/AbstractToggle.js";
import * as fetchUtil from "../util/fetchutil.js";

function SearchInputToggleView() {
  Toggle.apply(this, arguments);
}

function SearchMenuToggleView() {
  Toggle.apply(this, arguments);
}

SearchInputToggleView.prototype = Object.create(ToggleView.prototype);
SearchMenuToggleView.prototype = Object.create(ToggleView.prototype);

// SearchMenuToggleView.prototype.renderToggle = function (childDom) {
//   if (this.parentDom.children.length > 1) {
//     this.parentDom.children[1].remove();
//     return;
//   }
//   this.parentDom.appendChild(childDom);
// };

SearchInputToggleView.prototype.renderAutoComplete = function () {
  const autocompleteToggle = fetchUtil.fetch_use(
    `search/${value}`,
    new SearchInputToggle()
  );
  this.generateHistoryZone(autocompleteToggle.dom);
};

SearchInputToggleView.prototype.renderHistory = function () {
  if (this.hasHistoryZone()) {
    return;
  }
  const searchHistory = this.checkHistory();
  this.generateHistoryZone(searchHistory);
};

SearchInputToggleView.prototype.checkHistory = function () {
  const searchHistory = [...localStorage.getItem("localSearchHistory")];
  if (!this.isEmptyArr(searchHistory)) {
    return ["검색결과 없음"];
  }
  return searchHistory;
};

SearchInputToggleView.prototype.isEmptyArr = function (arr) {
  if (!Array.isArray(arr) || arr.length <= 0) {
    return false;
  }

  return true;
};

SearchInputToggleView.prototype.generateHistoryZone = function (data) {
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
