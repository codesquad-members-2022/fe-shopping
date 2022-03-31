import { ToggleView } from "../AbstractToggleView.js";
import * as domUtil from "../../../util/domutil.js";

function SearchInputView(staticData) {
  ToggleView.apply(this, arguments);
  this.staticData = staticData;
}

SearchInputView.prototype = Object.create(ToggleView.prototype);

SearchInputView.prototype.createToggleDOM = function ({
  liContents,
  ulClassName,
  liClassName,
}) {
  if (this.isEmptyArr(liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  const DOM = document.createElement("ul");
  DOM.classList.add(ulClassName);
  DOM.innerHTML =
    `${liContents.reduce((liHtml, contents) => {
      liHtml += `<li class="${liClassName}">${contents}</li>`;
      return liHtml;
    }, "")}` +
    /*html*/ `<button type="button" class="header__main--deleteHistoryBtn" data-button="removeHistory">기록 전체삭제</button>`;

  return DOM;
};

SearchInputView.prototype.render = function (state) {
  const removeTarget = this.staticData.toggleClassName;
  this.removePrevView(this.staticData.parentDom, removeTarget);

  if (this.isEmptyArr(state.liContents)) {
    state.liContents = this.staticData.emptyContents;
  }
  const autoCompleteDom = this.createToggleDOM(state);

  this.staticData.parentDom.appendChild(autoCompleteDom);
  const removeBtn = autoCompleteDom.querySelector(
    '[data-button="removeHistory"]'
  );
  this.addHistoryBtnEvent(removeBtn);
};

SearchInputView.prototype.removePrevView = function (parentDom, targetName) {
  if (domUtil.target$(parentDom, targetName)) {
    domUtil.target$(parentDom, targetName).remove();
  }
};

SearchInputView.prototype.hilight = function ({
  prevHilightIdx: prev,
  hilightIdx: current,
  toggleList: list,
}) {
  const signatureColor = "#4285f4";
  list[prev].style.color = "black";
  list[current].style.color = signatureColor;
};

SearchInputView.prototype.addHistoryBtnEvent = function (target) {
  target.addEventListener("click", () => this.clickRemoveBtn());
};

SearchInputView.prototype.addInputEvent = function (dom) {
  dom.addEventListener("input", (event) => this.inputSearchZone(event));
};

SearchInputView.prototype.addFocusEvent = function (dom) {
  dom.addEventListener("focus", () => this.focusSearchZone());
};

SearchInputView.prototype.addSpecialKeyEvent = function (dom) {
  dom.addEventListener("keydown", (event) => {
    const toggleList = domUtil.$All(this.staticData.toggleLiClassName);
    this.inputSpecialKey({ event, toggleList });
  });
};

SearchInputView.prototype.init = function () {
  const { parentDom, inputDom } = this.staticData;
  this.addInputEvent(parentDom);
  this.addInputEvent(parentDom);
  this.addFocusEvent(inputDom);
  this.addSpecialKeyEvent(parentDom);
};

export { SearchInputView };
