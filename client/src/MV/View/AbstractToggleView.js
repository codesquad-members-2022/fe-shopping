import * as domUtil from "../../util/domutil.js";
function ToggleView(parentDom) {
  // this.parentDom = domUtil.$(parentDom);
}

ToggleView.prototype.isEmptyArr = function (arr) {
  return arr.length <= 0;
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
