function Toggle(liContents, liClassName, ulClassName) {
  this.liContents = liContents;
  this.liClassName = liClassName;
  this.dom = document.createElement("ul");
  this.dom.classList.add(ulClassName);
  this.dom.dataset.toggle = "inputToggle";
  this.dom.innerHTML = this.getHTML();
}

Toggle.prototype.getHTML = function () {
  if (this.isEmptyArr(this.liContents)) {
    return;
  } // 컨텐츠 없으면 return undefined

  return /*html*/ `${this.liContents.reduce((liHtml, contents) => {
    liHtml += `<li class="${this.liClassName}">${contents}</li>`;
    return liHtml;
  }, "")}`;
};

Toggle.prototype.isEmptyArr = function (arr) {
  return arr.length <= 0;
};

export { Toggle };
