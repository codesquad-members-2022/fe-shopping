import Component from "../../../../core/Component";
import { store } from "../../../../Store";
import { createExtendsRelation } from "../../../../oop-utils";

function SearchCategory(...params) {
  Component.call(this, ...params);
}

createExtendsRelation(SearchCategory, Component);

SearchCategory.prototype.template = function () {
  const { categoryTitle } = store.state;
  return `
    <span class="category__title">${categoryTitle}</span>
    <span class="category__arrow">▼</span>
  `;
};

export default SearchCategory;
