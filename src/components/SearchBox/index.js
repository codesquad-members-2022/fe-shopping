import HtmlElement from '../../utils/HtmlElement.js';
import FormContainer from './FormContainer.js';
import Selector from './Selector.js';

function SearchBox(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

SearchBox.prototype.setTemplate = function () {
  this.$element.classList.add('search');
  new Selector('div', this.$element);
  new FormContainer('div', this.$element);
};

export default SearchBox;
