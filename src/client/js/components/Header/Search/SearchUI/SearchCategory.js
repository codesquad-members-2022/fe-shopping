import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";

function SearchCategory(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategory, Component);

SearchCategory.prototype.setup = function () {
  this.state = {
    categoryTitle: "전체",
  };
};
SearchCategory.prototype.template = function () {
  const { categoryTitle } = this.state;

  return `
    <span class="category__title">${categoryTitle}</span>
    <span class="category__arrow">▼</span>
  `;
};

export default SearchCategory;
