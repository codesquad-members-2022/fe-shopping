import HtmlElement from '../../utils/HtmlElement.js';
import { findTargetClassElement } from '../../utils/manuplateDOM.js';
import FormContainer from './FormContainer.js';
import Selector from './Selector.js';

export default function SearchBox($element) {
  HtmlElement.call(this, $element);
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

SearchBox.prototype.setTemplate = function () {
  return `
    <div class="search__selector pop-up-container"></div>
    <div class="search__container"></div>
  `;
  new FormContainer('div', this.$element);
};

SearchBox.prototype.renderChild = function () {
  const $selector = findTargetClassElement(this.$element, 'search__selector');
  const $formContainer = findTargetClassElement(
    this.$element,
    'search__container'
  );
  new Selector($selector);
  new FormContainer($formContainer);
};
