import Category from '../../components/Category.js';
import HtmlElement from '../../utils/HtmlElement.js';
import Section from '../section.js';

function Header(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
  // this.setEvent();
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
