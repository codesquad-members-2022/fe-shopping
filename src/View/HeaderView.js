import { ToggleView } from "./toggleView.js";
import * as domUtil from "/util/domutil.js";

function SearchInputToggleView(parentDom) {
  this.parentDom = domUtil.$(parentDom);
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
  } // 문제점: 자식요소 탐색이 어색해서 기능적으로 동작하게만 구현함 해결방안 필요
  console.log(childDom);
  console.log(this.parentDom);

  this.parentDom.appendChild(childDom);
};

export { SearchInputToggleView, SearchMenuToggleView };
