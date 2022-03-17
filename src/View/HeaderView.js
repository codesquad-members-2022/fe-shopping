import { ToggleView } from "./AbstractToggleView.js";
import { SearchInputToggle } from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";

function SearchInputToggleView(parentDom) {
  this.parentDom = domUtil.$(parentDom);
  this.searchHistory = [];
}

function SearchMenuToggleView(parentDom) {
  this.parentDom = domUtil.$(parentDom);
}

SearchInputToggleView.prototype = Object.create(ToggleView.prototype);
SearchMenuToggleView.prototype = Object.create(ToggleView.prototype);

SearchMenuToggleView.prototype.renderToggle = function (childDom) {
  if (this.parentDom.children.length > 1) {
    console.log(1);
    this.parentDom.children[1].remove();
    return;
  }
  this.parentDom.appendChild(childDom);
};

SearchInputToggleView.prototype.renderHistory = function () {
  // 만약 ul 태그가 없다면??
  if (this.renderHistory === []) {
    this.renderHistory = ["검색 기록이 없습니다."];
  }
  const historyToggle = new SearchInputToggle(this.searchHistory).dom;
  this.renderToggle(historyToggle);
};
export { SearchInputToggleView, SearchMenuToggleView };
