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

export { SearchInputToggle, SearchMenuToggle };
