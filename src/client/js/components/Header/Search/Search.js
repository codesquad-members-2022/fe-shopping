import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../core/oop-utils";
import SearchCategory from "./components/SearchCategory";
import SearchInput from "./components/SearchInput";
import SearchRecent from "./components/SearchRecent";
import SearchSuggestion from "./components/SearchSuggestion";

function Search(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Search, Component);

Search.prototype.mount = function () {
  const $searchCategory = this.$target.querySelector(".search__category");
  const $searchInput = this.$target.querySelector(".search__input");
  const $searchRecent = this.$target.querySelector(".search__recent");
  const $searchSuggestion = this.$target.querySelector(".search__suggestion");

  const searchCategory = new SearchCategory($searchCategory);
  const searchRecent = new SearchRecent($searchRecent);
  const searchSuggestion = new SearchSuggestion($searchSuggestion);
  const searchInput = new SearchInput($searchInput, {
    searchSuggestion,
    searchRecent,
  });
};

Search.prototype.template = function () {
  return `
    <div class="search__category"></div>
    <div class="search__input"></div>
    <div class="search__recent"></div>
    <div class="search__suggestion"></div>
  `;
};

export default Search;
