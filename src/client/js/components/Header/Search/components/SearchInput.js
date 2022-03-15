import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";
import { delay, request } from "../../../../core/utils";
import SearchRecent from "./SearchRecent";
import SearchSuggestion from "./SearchSuggestion";

function SearchInput(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchInput, Component);

SearchInput.prototype.setup = function () {
  this.state = {
    inputData: "",
  };
};
SearchInput.prototype.setEvent = function () {
  this.addEvent("keyup", "input", ({ target }) => {
    this.state.inputData = target.value;
    const curValue = target.value;
    delay(500).then(async () => {
      if (this.state.inputData === curValue) {
        const requestOptions = {
          query: {
            keyword: this.state.inputData,
          },
        };
        const { results: suggestionDatas } = await request(
          "search/autoComplete",
          requestOptions
        );
        if (suggestionDatas) {
          this.setState({ suggestionDatas });
        }
      }
    });
  });
};
SearchInput.prototype.mount = function () {
  const $searchRecent = this.$target.querySelector(".search__recent");
  const $searchSuggestion = this.$target.querySelector(".search__suggestion");
  const $input = this.$target.querySelector("input");

  const { suggestionDatas } = this.state;

  const searchRecent = new SearchRecent($searchRecent);
  const searchSuggestion = new SearchSuggestion($searchSuggestion, {
    suggestionDatas,
  });

  $input.focus();
  const curInput = $input.value;
  $input.value = "";
  $input.value = curInput;
};
SearchInput.prototype.template = function () {
  const { inputData } = this.state;
  return `
    <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" value="${inputData}"/>
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
