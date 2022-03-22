import { ToggleView } from "../AbstractToggleView.js";
import * as domUtil from "/util/domutil.js";

function SearchMenuView() {
  ToggleView.apply(this, arguments);
}

SearchMenuView.prototype = Object.create(ToggleView.prototype);

SearchMenuView.prototype.rederMenu = function (MenuDom) {
  // 이전 view 삭제 함수
  const removeTarget = ".search--menu--ul";
  this.removePrevView(this.parentDom);
  this.parentDom.appendChild(MenuDom);
  // 추가함수
};

SearchMenuView.prototype.removePrevView = function (parentDom, targetName) {
  if (domUtil.target$(parentDom, targetName)) {
    domUtil.target$(parentDom, targetName).remove();
  }
};
