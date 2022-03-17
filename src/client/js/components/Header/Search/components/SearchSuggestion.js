import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

const highlightWord = (string, word) => {
  const regex = new RegExp(`(?<front>.+)?(?<matchedWord>${word})(?<back>.+)?`);
  const { groups } = string.match(regex) || { groups: {} };
  const { front, matchedWord, back } = groups;
  return `${front || ""}${
    matchedWord ? `<span class="matchedWord">${matchedWord}</span>` : ""
  }${back || ""}`;
};

SearchSuggestion.prototype.setup = function () {
  this.state = {
    selected: -1,
    suggestionDatas: [],
    word: "",
    display: "none",
  };
};

SearchSuggestion.prototype.mount = function () {
  const { display } = this.state;
  this.$target.style.display = display;
};

SearchSuggestion.prototype.template = function () {
  const { suggestionDatas, word } = this.state;
  const suggestions = suggestionDatas
    ? suggestionDatas
        .map(({ keyword }) => `<span>${highlightWord(keyword, word)}</span>`)
        .join("")
    : "";
  return `
    <div class="suggestion__body">
        ${suggestions}
    </div>
  `;
};

export default SearchSuggestion;
