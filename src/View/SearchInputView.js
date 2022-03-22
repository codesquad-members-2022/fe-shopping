import { ToggleView } from "./AbstractToggleView.js";
import { SearchInputToggle } from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import * as fetchUtil from "../util/fetchutil.js";

function SearchInputView() {
  ToggleView.apply(this, arguments);
  this.emptyHistoryContents = ["검색 결과 없음"];

  this.searchHistoryData = new Set(
    JSON.parse(localStorage.getItem("localSearchHistory"))
  );

  this.keyUpDownCount = { listLength: null, upDownCount: 0 };
}

SearchInputView.prototype = Object.create(ToggleView.prototype);

SearchInputView.prototype.renderSearchAutoComplete = function (
  autoCompleteDom
) {
  const removeTarget = ".search--toggle--ul";
  this.removePrevView(this.parentDom, removeTarget);
  // 인자DOM에 전체 검색 삭제 이벤트 추가 필요함 이부분은 View가 아닌 DOM 넘겨주는 단계에서 처리 예정
  this.parentDom.appendChild(autoCompleteDom);
};

SearchInputView.prototype.renderSearchHistory = function (searchHistoryDom) {
  const removeTarget = ".search--toggle--ul";
  this.removePrevView(this.parentDom, removeTarget);
  // 인자DOM에 전체 검색 삭제 이벤트 추가 필요함 이부분은 View가 아닌 DOM 넘겨주는 단계에서 처리 예정
  this.parentDom.appendChild(searchHistoryDom);
};

SearchInputView.prototype.removePrevView = function (parentDom, targetName) {
  if (domUtil.target$(parentDom, targetName)) {
    domUtil.target$(parentDom, targetName).remove();
  } // 추후 데이터 어트리뷰트로 삭제하는 방법으로 변경예정
};
