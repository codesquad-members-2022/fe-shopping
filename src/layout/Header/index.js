import HtmlElement from '../../core/HtmlElement.js';
import { setInheritance } from '../../utils/manuplateDOM.js';
import Category from './Category/index.js';
import Section from './Section/index.js';

export default function Header({ $element }) {
  HtmlElement.call(this, { $element });
}
setInheritance({ parent: HtmlElement, child: Header });

Header.prototype.setTemplate = function () {
  return `
    <div class="category pop-up-container">카테고리</div>
    <section class="section"></section>
  `;
};

Header.prototype.renderChild = function () {
  const $categoryWrapper = this.$element.querySelector('.category');
  const $sectionWrapper = this.$element.querySelector('.section');
  const $category = new Category({ $element: $categoryWrapper });
  const $section = new Section({ $element: $sectionWrapper });
  $category.init();
  $section.init();
};
