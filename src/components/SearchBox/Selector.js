import HtmlElement from '../../utils/HtmlElement.js';

function Selector(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
  // this.setEvent();
}

Selector.prototype = Object.create(HtmlElement.prototype);
Selector.prototype.constructor = Selector;
// Object.setPrototypeOf(Selector.prototype, HtmlElement.prototype);

Selector.prototype.setTemplate = function () {
  this.$element.classList.add('search__selector');
  this.$element.innerHTML = template;
};

export default Selector;

const template = `<div><span>전체</span> <i class="fas fa-caret-down"></i></div>
<ul class="search__options">
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
</ul>`;
