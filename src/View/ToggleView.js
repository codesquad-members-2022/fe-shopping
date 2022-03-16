function ToggleView(parentDom) {
  this.parentDom = parentDom;
}

ToggleView.prototype.renderToggle = function (childDom) {
  // if (this.parentDom.firstChild) {
  //   this.parentDom.firstChild.remove();
  // }

  this.parentDom.appendChild(childDom);
};

export { ToggleView };
