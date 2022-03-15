function HtmlElement(htmlTag) {
  this.$element = document.createElement(htmlTag);
  this.template = '';
}

HtmlElement.prototype.setTemplate = function () {
  // child요소.render한 데이터를 this.$element에 appendChild
};

HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.template;
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
