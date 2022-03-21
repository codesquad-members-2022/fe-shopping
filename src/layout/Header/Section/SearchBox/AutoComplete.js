import HtmlElement from '../../../../utils/HtmlElement.js';

export default function AutoComplete($element, args) {
  HtmlElement.call(this, $element, args);
}

AutoComplete.prototype = Object.create(HtmlElement.prototype);
AutoComplete.prototype.constructor = AutoComplete;

AutoComplete.prototype.setTemplate = function () {
  const { autoSearchList, inputValue } = this.state;
  return template(autoSearchList, inputValue);
};

AutoComplete.prototype.setEvent = function () {};

const template = (autoSearchList, inputValue) => {
  console.log(inputValue);
  return `
  <ul>
  ${autoSearchList.map((term) => `<li>${term}</li>`).join('')}
  </ul>
`;
};
