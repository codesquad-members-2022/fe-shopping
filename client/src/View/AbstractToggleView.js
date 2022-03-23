import * as domUtil from "../util/domutil.js";
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

ToggleView.prototype.isEmptyArr = function (arr) {
  if (!Array.isArray(arr) || arr.length <= 0) {
    return true;
  }
};

ToggleView.prototype.removePrevView = function (prevClassName) {
  const prevSearchData = domUtil.$(prevClassName);
  if (prevSearchData) {
    prevSearchData.remove();
    return true;
  }
};

ToggleView.prototype.addReomoveHisoryEvent = function (target) {
  target.addEventListener("click", () => {
    this.removeHistory();
  });
};

export { ToggleView };
