import { Toggle } from "./AbstractToggle.js";

function SearchInputToggle(liContents) {
  this.liContents = liContents;
  this.liClassName = "search--toggle--li";
  this.ulClassName = "search--toggle--ul";
  this.dom = document.createElement("ul");
  this.dom.classList.add(this.ulClassName);
  this.dom.innerHTML = this.getHTML();
}

function SearchMenuToggle(liContents) {
  this.liContents = liContents;
  this.liClassName = "search--menu--li";
  this.ulClassName = "search--menu--ul";
  this.dom = document.createElement("ul");
  this.dom.classList.add(this.ulClassName);
  this.dom.innerHTML = this.getHTML();
}

SearchInputToggle.prototype = Object.create(Toggle.prototype);
SearchMenuToggle.prototype = Object.create(Toggle.prototype);

SearchInputToggle.prototype.getHTML = function () {
  if (this.isEmptyArr(this.liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  return (
    /*html*/ `${this.liContents.reduce((liHtml, contents) => {
      liHtml += `<li class="${this.liClassName}">${contents}</li>`;
      return liHtml;
    }, "")}` +
    '<button type="button" class="header__main--deleteHistoryBtn">기록 전체삭제</button>'
  );
};
export { SearchInputToggle, SearchMenuToggle };
