import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../utils/manuplateDOM.js';

function Selector(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Selector.prototype = Object.create(HtmlElement.prototype);
Selector.prototype.constructor = Selector;
// Object.setPrototypeOf(Selector.prototype, HtmlElement.prototype);

Selector.prototype.setTemplate = function () {
  this.$element.classList.add('search__selector');
  this.$element.innerHTML = template;
};

Selector.prototype.setEvent = function () {
  const $searchSelector = findTargetIdElement(this.$element, 'searchSelector');
  $searchSelector.addEventListener('click', showCategory.bind(this));
};

export default Selector;

function showCategory() {
  const $options = findTargetIdElement(this.$element, 'searchOptions');
  handleDisplayElement($options);
}

const template = `
<div id="searchSelector">
  <span>전체</span> <i class="fas fa-caret-down"></i>
</div>
<div class="none search__options" id="searchOptions">
 <ul>
 <li>옵션1</li>
 <li>옵션2</li>
 <li>옵션3</li>
 <li>옵션4</li>
 <li>옵션5</li>
 <li>옵션6</li>
 <li>옵션7</li>
 <li>옵션8</li>
 <li>옵션9</li>
 <li>옵션10</li>
 </ul>
</div>`;
