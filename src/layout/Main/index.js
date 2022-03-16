import HtmlElement from '../../utils/HtmlElement.js';

function Main(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Main.prototype = Object.create(HtmlElement.prototype);
Main.prototype.constructor = Main;
// Object.setPrototypeOf(Main.prototype, HtmlElement.prototype);

Main.prototype.setTemplate = function () {
  this.$element.id = 'main';
  this.$element.innerHTML = `메인`;
};

export default Main;
