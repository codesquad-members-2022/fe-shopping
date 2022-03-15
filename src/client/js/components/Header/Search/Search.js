import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../core/oop-utils";
import SearchCategory from "./components/SearchCategory";
import SearchInput from "./components/SearchInput";

function Search(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Search, Component);

Search.prototype.mount = function () {
  const $searchCategory = this.$target.querySelector(".search__category");
  const $searchInput = this.$target.querySelector(".search__input");
  const searchCategory = new SearchCategory($searchCategory);
  const searchInput = new SearchInput($searchInput);
};
Search.prototype.template = function () {
  return `
    <div class="search__category"></div>
    <div class="search__input"></div>
  `;
};

export default Search;
