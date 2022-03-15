function ToggleView(parentDom) {
  this.parentDom = parentDom;
}

ToggleView.prototype.renderToggle = function (childDom) {
  this.parentDom.appendChild(childDom);
};

export { ToggleView };
