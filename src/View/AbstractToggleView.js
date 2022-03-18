import * as domUtil from "/util/domutil.js";
function ToggleView(parentDom) {
  this.parentDom = domUtil.$(parentDom);
}

ToggleView.prototype.renderToggle = function (childDom) {
  if (!childDom.hasChildNodes()) {
    return;
  }

  if (this.parentDom.children[1]) {
    this.parentDom.children[1].remove();
    return;
  } // 문제점: 자식요소 탐색이 어색해서 기능적으로 동작하게만 구현함 해결방안 필요

  this.parentDom.appendChild(childDom);
};

export { ToggleView };
