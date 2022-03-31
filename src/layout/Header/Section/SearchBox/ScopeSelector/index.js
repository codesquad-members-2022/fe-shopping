import HtmlElement from '../../../../../core/HtmlElement.js';
import { POP_UP } from '../../../../../constant.js';
import { handleClick } from './eventHandler.js';
import { setInheritance } from '../../../../../utils/manuplateDOM.js';

export default function ScopeSelector($element) {
  HtmlElement.call(this, $element);
}

setInheritance({ parent: HtmlElement, child: ScopeSelector });

ScopeSelector.prototype.setTemplate = function () {
  const { option } = this.interface.getStatefromStore({ option: null });
  return template(option);
};

ScopeSelector.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

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
