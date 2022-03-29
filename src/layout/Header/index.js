import HtmlElement from '../../utils/HtmlElement.js';
import Category from './Category/index.js';
import Section from './Section/index.js';

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
  const $category = this.$element.querySelector('.category');
  const $section = this.$element.querySelector('.section');
  new Category($category);
  new Section($section);
};
