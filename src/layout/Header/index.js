import Category from '../../components/Category/index.js';
import HtmlElement from '../../utils/HtmlElement.js';
import Section from './Section.js';

function Header(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Header.prototype = Object.create(HtmlElement.prototype);
Header.prototype.constructor = Header;
// Object.setPrototypeOf(Header.prototype, HtmlElement.prototype);

Header.prototype.setTemplate = function () {
  this.$element.id = 'header';
  new Category('div', this.$element);
  new Section('section', this.$element);
};

export default Header;
