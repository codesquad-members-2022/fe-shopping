function HtmlElement(htmlTag, $parent) {
  this.$parent = $parent;
  this.$element = document.createElement(htmlTag);
}

HtmlElement.prototype.setTemplate = function () {
  this.$element.innerHTML = ``;
};

HtmlElement.prototype.render = function () {
  this.$parent.appendChild(this.$element);
  this.setEvent();
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
