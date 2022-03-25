import HtmlElement from '../../../../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../../../../utils/manuplateDOM.js';
import { POP_UP } from '../../../../../constant.js';

export default function ScopeSelector($element, args) {
  HtmlElement.call(this, $element, args);
}

ScopeSelector.prototype = Object.create(HtmlElement.prototype);
ScopeSelector.prototype.constructor = ScopeSelector;

ScopeSelector.prototype.setTemplate = function () {
  const { option } = this.state;
  return template(option);
};

ScopeSelector.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

function handleClick({ target }) {
  const $searchSelector = target.closest('#searchSelector');
  if ($searchSelector) return showCategory.apply(this);
  if (target.dataset?.option)
    return this.state.changeSearchOption(target.dataset.option);
}

function showCategory() {
  const $options = findTargetIdElement(this.$element, 'searchOptions');
  handleDisplayElement($options);
}

const options = [
  '전체',
  '옵션1',
  '옵션2',
  '옵션3',
  '옵션4',
  '옵션5',
  '옵션6',
  '옵션7',
  '옵션8',
  '옵션9',
  '옵션10',
];

const template = (option) => `
<div id="searchSelector">
  <span>${option}</span> <i class="fas fa-caret-down"></i>
</div>
<div class="${POP_UP.hidden} search__options" id="searchOptions">
 <ul>
 ${options.map((option) => `<li data-option=${option}>${option}</li>`).join('')}
 </ul>
 </div>
 `;
