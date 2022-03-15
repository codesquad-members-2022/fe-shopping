import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchCategory(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategory, Component);

SearchCategory.prototype.template = function () {
  return `
    <span>전체</span>
    <span>▼</span>
  `;
};

export default SearchCategory;
