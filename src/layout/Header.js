import Category from '../components/Category.js';
import HtmlElement from '../utils/HtmlElement.js';

function Header(htmlTag) {
  HtmlElement.call(this, htmlTag);
  this.setTemplate();
  this.render();
  this.setEvent();
}

Header.prototype = Object.create(HtmlElement.prototype);
Header.prototype.constructor = Header;
// Object.setPrototypeOf(Header.prototype, HtmlElement.prototype);

Header.prototype.setTemplate = function () {
  this.$element.id = 'header';
  const category = new Category('div');
  this.template = category.$element.innerHTML;
};

export default Header;
