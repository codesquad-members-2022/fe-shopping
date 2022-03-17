import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../core/oop-utils";
import { request } from "../../../core/utils";
import SearchCategory from "./components/SearchCategory";
import SearchCategoryList from "./components/SearchCategoryList";
import SearchInput from "./components/SearchInput";
import SearchRecent from "./components/SearchRecent";
import SearchSuggestion from "./components/SearchSuggestion";

function Search(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Search, Component);

Search.prototype.setEvent = function () {
  this.addEvent("click", ".search__category", ({ target }) => {
    console.log(target);
  });
};
Search.prototype.mount = async function () {
  const $searchCategory = this.$target.querySelector(".search__category");
  const $searchCategoryList = this.$target.querySelector(
    ".search__category-list"
  );
  const $searchInput = this.$target.querySelector(".search__input");
  const $searchRecent = this.$target.querySelector(".search__recent");
  const $searchSuggestion = this.$target.querySelector(".search__suggestion");

  const { results: categoryData } = await request("search/category");

  const searchCategory = new SearchCategory($searchCategory);
  const searchCategoryList = new SearchCategoryList($searchCategoryList, {
    categoryData,
  });
  const searchRecent = new SearchRecent($searchRecent);
  const searchSuggestion = new SearchSuggestion($searchSuggestion);
  const searchInput = new SearchInput($searchInput, {
    searchSuggestion,
    searchRecent,
  });
  [
    searchCategory,
    searchCategoryList,
    searchRecent,
    searchSuggestion,
    searchInput,
  ].forEach((component) => {
    component.initRender();
  });
};

Search.prototype.template = function () {
  return `
    <div class="search__category"></div>
    <ul class="search__category-list"></ul>
    <div class="search__input"></div>
    <div class="search__recent"></div>
    <div class="search__suggestion"></div>
  `;
};

export default Search;
