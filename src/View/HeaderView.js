import { ToggleView } from "./AbstractToggleView.js";
import { SearchInputToggle } from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import { Toggle } from "../Components/AbstractToggle.js";
import * as fetchUtil from "../util/fetchutil.js";

function SearchInputToggleView() {
  ToggleView.apply(this, arguments);
  this.emptyHistoryContents = ["검색 결과 없음"];
}

function SearchMenuToggleView() {
  ToggleView.apply(this, arguments);
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

SearchInputToggleView.prototype.renderAutoComplete = async function (
  inputValue
) {
  const autocompleteToggle = await fetchUtil.fetch_use(
    `search/${inputValue}`,
    SearchInputToggle
  );
  this.generateSearchContents(autocompleteToggle.dom);
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
  const prevSearchData = domUtil.$(".search--toggle--ul");
  if (prevSearchData) {
    prevSearchData.remove();
  }
  const searchZoneToggle = new SearchInputToggle(data);
  this.parentDom.appendChild(searchZoneToggle.dom);
}; // 필요할 경우 searchHitoryZone 비슷한 방식으로 구현해야함

SearchInputToggleView.prototype.hasHistoryZone = function () {
  const childDomClassName = ".search--toggle--ul";
  if (domUtil.target$(this.parentDom, childDomClassName)) {
    return true; // 이부분 에러면 querySelector 결과가 undefined라 에러임
  }

  return false;
};

export { SearchInputToggleView, SearchMenuToggleView };
