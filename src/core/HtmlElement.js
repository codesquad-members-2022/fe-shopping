export default function HtmlElement({ $element, isDirect }) {
  this.$element = $element;
}

HtmlElement.prototype.init = function () {
  this.render();
  this.setEvent();
};

HtmlElement.prototype.conenctStore = function () {};

HtmlElement.prototype.setTemplate = function () {
  return ``;
};

HtmlElement.prototype.renderChild = function () {};

HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.setTemplate();
  this.renderChild();
};

HtmlElement.prototype.setEvent = function () {};
