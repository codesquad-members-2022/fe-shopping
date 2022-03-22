import { ToggleView } from "../AbstractToggleView.js";
import * as domUtil from "../../util/domutil.js";

function SearchMenuView() {
  ToggleView.apply(this, arguments);
}

SearchMenuView.prototype = Object.create(ToggleView.prototype);

SearchMenuView.prototype.rederMenu = function (MenuDom) {
  const removeTarget = ".search--menu--ul";
  this.removePrevView(this.parentDom);
  // 역시 이부분도 클릭시 textContent를 target으로 변경하는 이벤트 등록 추후 필요
  this.parentDom.appendChild(MenuDom);
};

SearchMenuView.prototype.removePrevView = function (parentDom, targetName) {
  if (domUtil.target$(parentDom, targetName)) {
    domUtil.target$(parentDom, targetName).remove();
  }
};

export { SearchMenuView };
