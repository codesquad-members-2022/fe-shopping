export default function HtmlElement($element, args) {
  this.$element = $element;
  this.args = args;
  this.state;
  this.init();
  this.render();
  this.setEvent();
}

HtmlElement.prototype.init = function () {
  this.state = {
    ...this.args,
  };
};

HtmlElement.prototype.setTemplate = function () {
  return ``;
};

HtmlElement.prototype.renderChild = function () {};

HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.setTemplate();
  this.renderChild();
};

HtmlElement.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  this.render();
};

HtmlElement.prototype.setEvent = function () {};
