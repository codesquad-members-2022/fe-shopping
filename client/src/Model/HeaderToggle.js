import { Toggle } from "./AbstractToggle.js";

function SearchInputToggle() {
  this.liClassName = "search--toggle--li";
  this.ulClassName = "search--toggle--ul";
}

function SearchMenuToggle() {
  this.liClassName = "search--menu--li";
  this.ulClassName = "search--menu--ul";
}

SearchInputToggle.prototype = Object.create(Toggle.prototype);
SearchMenuToggle.prototype = Object.create(Toggle.prototype);

SearchInputToggle.prototype.getHTML = function (liContents) {
  if (this.isEmptyArr(liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  const DOM = document.createElement("ul");
  DOM.classList.add(this.ulClassName);
  DOM.innerHTML =
    `${liContents.reduce((liHtml, contents) => {
      liHtml += `<li class="${this.liClassName}">${contents}</li>`;
      return liHtml;
    }, "")}` +
    /*html*/ `<button type="button" class="header__main--deleteHistoryBtn" data-button="removeHistory">기록 전체삭제</button>`;

  return DOM;
};

SearchMenuToggle.prototype.getHTML = function (liContents) {
  if (this.isEmptyArr(liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  const DOM = document.createElement("ul");
  DOM.classList.add(this.ulClassName);
  DOM.innerHTML = /*html*/ `${liContents.reduce((liHtml, contents) => {
    liHtml += `<li class="${this.liClassName}">${contents}</li>`;
    return liHtml;
  }, "")}`;

  return DOM;
};
export { SearchInputToggle, SearchMenuToggle };
