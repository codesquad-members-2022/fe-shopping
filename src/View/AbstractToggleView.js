import * as domUtil from "/util/domutil.js";
function ToggleView(parentDom) {
  this.parentDom = domUtil.$(parentDom);
}

ToggleView.prototype.renderToggle = function (childDom) {
  // if (!childDom.hasChildNodes()) {
  //   return;
  // } // 수정필요

  if (this.parentDom.children[1]) {
    this.parentDom.children[1].remove();
    // return;
  }

  this.parentDom.appendChild(childDom);
};

export { ToggleView };
