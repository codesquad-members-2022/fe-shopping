import HtmlElement from '../utils/HtmlElement.js';

function Category(htmlTag) {
  HtmlElement.call(this, htmlTag);
}

Category.prototype = Object.create(HtmlElement.prototype);
Category.prototype.constructor = Category;

// Object.setPrototypeOf(Category.prototype, HtmlElement.prototype);

export default Category;
