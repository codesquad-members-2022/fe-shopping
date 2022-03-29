import HtmlElement from '../utils/HtmlElement.js';
import { hideAllPopUp } from '../utils/manuplateDOM.js';
import Header from './Header/index.js';
import Main from './Main/index.js';

export default function Root($element) {
  HtmlElement.call(this, $element);
}

Root.prototype = Object.create(HtmlElement.prototype);
Root.prototype.constructor = Root;

Root.prototype.setTemplate = function () {
  return `
    <header id="header"></header>
    <main id="main"></main>
  `;
};

Root.prototype.renderChild = function () {
  const $header = this.$element.querySelector('#header');
  const $main = this.$element.querySelector('#main');
  new Header($header);
  new Main($main);
};

Root.prototype.setEvent = function () {
  document.body.addEventListener('click', hideAllPopUp);
};
