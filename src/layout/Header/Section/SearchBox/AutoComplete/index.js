import { POP_UP } from '../../../../../constant.js';
import HtmlElement from '../../../../../core/HtmlElement.js';
import { setInheritance } from '../../../../../utils/manuplateDOM.js';

export default function AutoComplete({ $element }) {
  HtmlElement.call(this, { $element });
}

setInheritance({ parent: HtmlElement, child: AutoComplete });

AutoComplete.prototype.setTemplate = function () {
  const { autoSearchList, inputValue, activeAutoTerm, showAutoComplete } =
    this.interface.getStatefromStore({
      autoSearchList: null,
      inputValue: null,
      activeAutoTerm: null,
      showAutoComplete: null,
    });
  const isActive = (idx) => (idx === activeAutoTerm ? 'active__term' : '');
  showAutoComplete
    ? this.$element.classList.add(POP_UP.show)
    : this.$element.classList.add(POP_UP.hidden);
  return template(isActive, autoSearchList, inputValue);
};

const template = (isActive, autoSearchList, inputValue) => {
  // console.log(inputValue);
  return `
  <ul>
  ${autoSearchList
    .map((term, idx) => `<li class="${isActive(idx)}">${term}</li>`)
    .join('')}
  </ul>
`;
};
