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
  this.$parent.appendChild(this.$element);
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
