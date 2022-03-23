import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../store";
import { highlightWord } from "../controllers/searchSuggestion";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

SearchSuggestion.prototype.mount = function () {
  const { searchSuggestionDisplay } = store.state;
  this.$target.style.display = searchSuggestionDisplay;
};

SearchSuggestion.prototype.template = function () {
  const { suggestionDatas, searchWord, selectedInputIdx } = store.state;
  const isSelectedIdx = (idx) =>
    idx + 1 === selectedInputIdx ? "class='selected'" : "";

  const suggestions = suggestionDatas
    ?.map(
      ({ keyword }, idx) =>
        `<span ${isSelectedIdx(idx)}>${highlightWord(
          keyword,
          searchWord
        )}</span>`
    )
    .join("");

  return `
    <div class="suggestion__body">
        ${suggestions || ""}
    </div>
  `;
};

export default SearchSuggestion;
