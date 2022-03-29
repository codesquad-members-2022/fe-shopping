import HtmlElement from '../../../../../utils/HtmlElement.js';
import { setInheritance } from '../../../../../utils/manuplateDOM.js';

export default function AutoComplete($element, args) {
  HtmlElement.call(this, $element, args);
}

setInheritance({ parent: HtmlElement, child: AutoComplete });

AutoComplete.prototype.setTemplate = function () {
  const { autoSearchList, inputValue, activeAutoTerm } = this.state;
  const isActive = (idx) => (idx === activeAutoTerm ? 'active__term' : '');
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
