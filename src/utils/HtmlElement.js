function HtmlElement(htmlTag) {
  this.$element = document.createElement(htmlTag);
  this.template = '';
}

HtmlElement.prototype.createTemplate = function (template) {
  this.template = template;
};

HtmlElement.prototype.render = function () {
  this.$element.innnerHTML = this.template;
  return this.$element;
};

export default HtmlElement;
