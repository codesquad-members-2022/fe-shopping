import HtmlElement from '../../utils/HtmlElement.js';

function Main($element) {
  HtmlElement.call(this, $element);
}

Main.prototype = Object.create(HtmlElement.prototype);
Main.prototype.constructor = Main;

Main.prototype.setTemplate = function () {
  return `메인`;
};

export default Main;
