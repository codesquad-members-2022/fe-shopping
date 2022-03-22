import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

const highlightWord = (string, word) => {
  const regex = new RegExp(`(?<front>.+)?(?<matchedWord>${word})(?<back>.+)?`);
  const { groups } = string.match(regex) || { groups: {} };
  const { front, matchedWord, back } = groups;

  return matchedWord
    ? `${front || ""}<span class="matchedWord">${matchedWord}</span>${
        back || ""
      }`
    : string;
};

SearchSuggestion.prototype.getSelectedData = function () {
  const $suggestionBody = this.$target.querySelector(".suggestion__body");
  const $selected = $suggestionBody.querySelector(".selected");
  return $selected ? $selected.textContent : null;
};

SearchSuggestion.prototype.mount = function () {
  const { searchSuggestionDisplay } = store.state;
  this.$target.style.display = searchSuggestionDisplay;
};

SearchSuggestion.prototype.template = function () {
  const { suggestionDatas, searchWord, selectedInputIdx } = store.state;
  const suggestions = suggestionDatas
    ? suggestionDatas
        .map(
          ({ keyword }, idx) =>
            `<span ${
              idx + 1 === selectedInputIdx ? "class='selected'" : ""
            }>${highlightWord(keyword, searchWord)}</span>`
        )
        .join("")
    : "";
  return `
    <div class="suggestion__body">
        ${suggestions}
    </div>
  `;
};

export default SearchSuggestion;
