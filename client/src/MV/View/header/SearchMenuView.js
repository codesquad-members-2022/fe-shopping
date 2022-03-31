import { ToggleView } from "../AbstractToggleView.js";
import * as domUtil from "../../../util/domutil.js";

function SearchMenuView(staticData) {
  ToggleView.apply(this, arguments);
  this.staticData = staticData;
}

SearchMenuView.prototype = Object.create(ToggleView.prototype);

SearchMenuView.prototype.render = function (state) {
  const removeTarget = this.staticData.toggleClassName;
  if (this.removePrevView(this.staticData.parentDom, removeTarget)) {
    return;
  }
  const newMenuDom = this.createToggleDom(state);
  this.staticData.parentDom.appendChild(newMenuDom);
};

SearchMenuView.prototype.removePrevView = function (parentDom, targetName) {
  if (parentDom.querySelector(targetName)) {
    parentDom.querySelector(targetName).remove();
    return true;
  }
};

SearchMenuView.prototype.createToggleDom = function ({
  liContents,
  toggleClassName,
  toggleLiClassName,
}) {
  if (this.isEmptyArr(liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  const DOM = document.createElement("ul");
  DOM.classList.add(toggleClassName);
  DOM.innerHTML = /*html*/ `${liContents.reduce((liHtml, contents) => {
    liHtml += `<li class="${toggleLiClassName}">${contents}</li>`;
    return liHtml;
  }, "")}`;

  return DOM;
};

SearchMenuView.prototype.addClickEvent = function (dom) {
  dom.addEventListener("click", () => this.getMenuData());
};

SearchMenuView.prototype.addClickoutEvent = function (dom) {
  dom.addEventListener("click", (event) => this.removeMenu(event));
};

SearchMenuView.prototype.init = function () {
  const { parentDom } = this.staticData;
  const vanillaBody = domUtil.$("body");

  this.addClickEvent(parentDom);
  this.addClickoutEvent(vanillaBody);
};

export { SearchMenuView };
