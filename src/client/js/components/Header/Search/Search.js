import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../oop-utils";
import { request } from "../../../utils";
import SearchCategory from "./SearchUI/SearchCategory";
import SearchCategoryList from "./SearchUI/SearchCategoryList";
import SearchInput from "./SearchUI/SearchInput";
import SearchRecent from "./SearchUI/SearchRecent";
import SearchSuggestion from "./SearchUI/SearchSuggestion";
import {
  handleBodyClick,
  handleSearchCategoryClick,
  handleCListTransStart,
  handleCListTransEnd,
} from "./controllers/search";
import { store } from "../../../Store";

function Search(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Search, Component);

Search.prototype.setEvent = function () {
  document.body.addEventListener("click", handleBodyClick);
  this.addEvent("click", ".search__category", handleSearchCategoryClick);
  this.addEvent(
    "transitionstart",
    ".search__category-list",
    handleCListTransStart
  );
  this.addEvent("transitionend", ".search__category-list", handleCListTransEnd);
};

Search.prototype.mount = async function () {
  const $searchCategory = this.$target.querySelector(".search__category");
  const $searchCategoryList = this.$target.querySelector(
    ".search__category-list"
  );
  const $searchInput = this.$target.querySelector(".search__input");
  const $searchRecent = this.$target.querySelector(".search__recent");
  const $searchSuggestion = this.$target.querySelector(".search__suggestion");

  const { results: categoryDatas } = await request("search/category");
  store.setState({ categoryDatas });

  const searchCategory = new SearchCategory($searchCategory);
  const searchCategoryList = new SearchCategoryList($searchCategoryList);
  const searchRecent = new SearchRecent($searchRecent);
  const searchSuggestion = new SearchSuggestion($searchSuggestion);
  const searchInput = new SearchInput($searchInput);

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
