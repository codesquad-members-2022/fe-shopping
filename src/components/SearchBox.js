import HtmlElement from '../utils/HtmlElement.js';

function SearchBox() {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

export default SearchBox;
