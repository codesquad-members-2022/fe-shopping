function ToggleView(parentDom) {
  this.parentDom = parentDom;
}

ToggleView.prototype.renderToggle = function (childDom) {
  this.parentDom.appendChild(childDom);
}; // 프로토타입 관련 문제

export { ToggleView };
