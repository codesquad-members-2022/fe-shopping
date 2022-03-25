import HtmlElement from '../../utils/HtmlElement.js';

export default function Main($element) {
  HtmlElement.call(this, $element);
}

Main.prototype = Object.create(HtmlElement.prototype);
Main.prototype.constructor = Main;

Main.prototype.setTemplate = function () {
  return `
      <h1>메인</h1>`;
};
