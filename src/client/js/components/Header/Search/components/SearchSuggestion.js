import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

SearchSuggestion.prototype.setup = function () {
  this.state = {
    suggestionDatas: [],
    display: "none",
  };
};

SearchSuggestion.prototype.mount = function () {
  const { display } = this.state;
  this.$target.style.display = display;
};

SearchSuggestion.prototype.template = function () {
  const { suggestionDatas } = this.state;
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
