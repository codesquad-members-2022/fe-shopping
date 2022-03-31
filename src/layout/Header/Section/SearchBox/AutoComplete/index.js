import { POP_UP } from '../../../../../constant.js';
import HtmlElement from '../../../../../core/HtmlElement.js';
import { setInheritance } from '../../../../../utils/manuplateDOM.js';

export default function AutoComplete({ $element }) {
  HtmlElement.call(this, { $element });
}

setInheritance({ parent: HtmlElement, child: AutoComplete });

AutoComplete.prototype.beforeRender = function () {
  this.state = {
    ...this.interface.getStatefromStore({
      autoSearchList: null,
      inputValue: null,
      activeAutoTerm: null,
      showHistroy: null,
    }),
  };
};

AutoComplete.prototype.setTemplate = function () {
  const { autoSearchList, inputValue, activeAutoTerm, showHistroy } =
    this.state;
  const isActive = (idx) => (idx === activeAutoTerm ? 'active__term' : '');
  this.$element.classList.remove(showHistroy ? POP_UP.show : POP_UP.hidden);
  this.$element.classList.add(!showHistroy ? POP_UP.show : POP_UP.hidden);
  return template(isActive, autoSearchList, inputValue);
};

const template = (isActive, autoSearchList, inputValue) => {
  // console.log(inputValue);
  return autoSearchList.length === 0
    ? ``
    : `
  <ul>
  ${autoSearchList
    .map((term, idx) => `<li class="${isActive(idx)}">${term}</li>`)
    .join('')}
  </ul>
`;
};
