function Toggle(liContents, liClassName, ulClassName) {
  this.liContents = liContents;
  this.liClassName = liClassName;
  this.dom = document.createElement("ul");
  this.dom.classList.add(ulClassName);
  this.dom.innerHTML = this.getHTML();
}

Toggle.prototype.getHTML = function () {
  return /*html*/ `${this.liContents.reduce((liHtml, contents) => {
    liHtml += `<li class="${this.liClassName}">${contents}</li>`;
    return liHtml;
  }, "")}
    `;
};

export { Toggle };
