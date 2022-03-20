import Category from '../../components/Category/index.js';
import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetClassElement,
  findTargetIdElement,
  hidePopUp,
} from '../../utils/manuplateDOM.js';
import Section from './Section.js';

export default function Header($element) {
  HtmlElement.call(this, $element);
}

Header.prototype = Object.create(HtmlElement.prototype);
Header.prototype.constructor = Header;

Header.prototype.setTemplate = function () {
  return `
    <div class="category pop-up-container">카테고리</div>
    <section class="section"></section>
  `;
};

Header.prototype.renderChild = function () {
  const $category = findTargetClassElement(this.$element, 'category');
  const $section = findTargetClassElement(this.$element, 'section');
  new Category($category);
  new Section($section);
};

Header.prototype.setEvent = function () {
  document.body.addEventListener('click', hidePopUp);
};
