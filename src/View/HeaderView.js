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
    this.parentDom.children[1].remove();
    return;
  }
  this.parentDom.appendChild(childDom);
};

SearchInputToggleView.prototype.renderHistory = function () {
  if (!domUtil.$(".search--toggle--ul").innerHTML === "") {
    return;
  }
  if (this.searchHistory.length === 0) {
    this.renderNoHistory();
    return;
  }

  const historyDom = new SearchInputToggle(this.historyDom).dom;
  this.renderToggle(historyDom);
};

SearchInputToggleView.prototype.renderNoHistory = function () {
  const childDom = new SearchInputToggle(["검색 기록이 없습니다."]).dom;
  this.renderToggle(childDom);
};

export { SearchInputToggleView, SearchMenuToggleView };
