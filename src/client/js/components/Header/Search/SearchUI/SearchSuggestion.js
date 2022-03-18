import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";

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

SearchSuggestion.prototype.setup = function () {
  this.state = {
    selectedIndex: 0,
    suggestionDatas: [],
    word: "",
    display: "none",
  };
};

SearchSuggestion.prototype.getSelectedData = function () {
  const $suggestionBody = this.$target.querySelector(".suggestion__body");
  const $selected = $suggestionBody.querySelector(".selected");
  return $selected ? $selected.textContent : null;
};

SearchSuggestion.prototype.mount = function () {
  const { display } = this.state;
  this.$target.style.display = display;
};

SearchSuggestion.prototype.template = function () {
  const { suggestionDatas, word, selectedIndex } = this.state;
  const suggestions = suggestionDatas
    ? suggestionDatas
        .map(
          ({ keyword }, idx) =>
            `<span ${
              idx + 1 === selectedIndex ? "class='selected'" : ""
            }>${highlightWord(keyword, word)}</span>`
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
