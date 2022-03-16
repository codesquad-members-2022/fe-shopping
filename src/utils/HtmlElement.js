function HtmlElement(htmlTag, $parent) {
  this.$parent = $parent;
  this.$element = document.createElement(htmlTag);
  this.setTemplate();
  this.render();
  this.setEvent();
}

HtmlElement.prototype.setTemplate = function () {
  this.$element.innerHTML = ``;
};

HtmlElement.prototype.render = function () {
  // prototype.directRender()할 때는 render가 호출되더라도 부모가 있을 때만 실행
  this.$parent && this.$parent.appendChild(this.$element);
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
