import HtmlElement from '../../utils/HtmlElement.js';

function RecentSearchList(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;
// Object.setPrototypeOf(RecentSearchList.prototype, HtmlElement.prototype);

RecentSearchList.prototype.setTemplate = function () {
  this.$element.id = 'RecentSearchList';
  this.$element.innerHTML = `
  <ul id="recentSearchList">
    ${termList.map((term) => `<li>${term}</li>`).join('')}
  </ul>`;
};

RecentSearchList.prototype.directRender = function () {
  console.log('search', this.$element);
  return this.$element.innerHTML;
};

export default RecentSearchList;

const termList = ['검색어1', '검색어2', '검색어3', '검색어4'];
