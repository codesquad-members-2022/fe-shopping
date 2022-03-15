import { findTargetIdElement } from './manuplateDOM.js';

function HtmlElement(htmlTag) {
  this.$parent = findTargetIdElement(document, 'main');
  this.$element = document.createElement(htmlTag);
  this.template = '';
}

HtmlElement.prototype.setTemplate = function () {
  return ``;
};

HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.template;
  this.$parent.appendChild(this.$element);
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
