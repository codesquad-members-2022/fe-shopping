import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

SearchSuggestion.prototype.mount = function () {
  const { suggestionDatas } = this.$props;
  if (suggestionDatas?.length) {
    this.$target.style.display = "flex";
  } else {
    this.$target.style.display = "none";
  }
};
SearchSuggestion.prototype.template = function () {
  const { suggestionDatas } = this.$props;
  return `
    <div class="suggestion__body">
        ${
          suggestionDatas
            ? suggestionDatas
                .map(({ keyword }) => `<span>${keyword}</span>`)
                .join("")
            : ""
        }
    </div>
  `;
};

export default SearchSuggestion;
