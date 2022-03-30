import HtmlElement from '../core/HtmlElement.js';
import {
  hideAllPopUp,
  initInferface,
  setInheritance,
} from '../utils/manuplateDOM.js';
import Header from './Header/index.js';
import Main from './Main/index.js';
import mainStore from './Main/store.js';

export default function Root({ $element }) {
  HtmlElement.call(this, { $element });
}

setInheritance({ parent: HtmlElement, child: Root });

Root.prototype.setTemplate = function () {
  return `
    <header id="header"></header>
    <main id="main"></main>
  `;
};

Root.prototype.renderChild = function () {
  const $headerWrapper = this.$element.querySelector('#header');
  const $mainWrapper = this.$element.querySelector('#main');
  const $header = new Header({ $element: $headerWrapper });
  const $main = new Main({ $element: $mainWrapper });
  $header.init();
  initInferface({ elements: { $main }, store: mainStore });
};

Root.prototype.setEvent = function () {
  document.body.addEventListener('click', hideAllPopUp);
};
