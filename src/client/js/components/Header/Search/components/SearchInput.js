import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";
import SearchRecent from "./SearchRecent";
import SearchSuggestion from "./SearchSuggestion";

function SearchInput(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchInput, Component);

SearchInput.prototype.mount = function () {
  const $searchRecent = this.$target.querySelector(".search__recent");
  const $searchSuggestion = this.$target.querySelector(".search__suggestion");

  const searchRecent = new SearchRecent($searchRecent);
  const searchSuggestion = new SearchSuggestion($searchSuggestion);
};
SearchInput.prototype.template = function () {
  return `
    <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" />
    <span class="input__icon">
        <i class="fas fa-microphone"></i>
    </span>
    <span class="input__icon">
        <i class="fas fa-search"></i>
    </span>
    <div class="search__recent"></div>
    <div class="search__suggestion"></div>
  `;
};

export default SearchInput;
