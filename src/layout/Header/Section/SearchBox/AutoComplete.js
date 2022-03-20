import HtmlElement from '../../../../utils/HtmlElement.js';

export default function AutoComplete($element, args) {
  HtmlElement.call(this, $element, args);
}

AutoComplete.prototype = Object.create(HtmlElement.prototype);
AutoComplete.prototype.constructor = AutoComplete;

AutoComplete.prototype.setTemplate = function () {
  return template;
};

AutoComplete.prototype.setEvent = function () {};

const terms = [
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

const template = `
  <ul>
  ${terms.map((term) => `<li>${term}</li>`).join('')}
  </ul>
`;
