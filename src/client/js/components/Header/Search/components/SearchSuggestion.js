import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchSuggestion(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchSuggestion, Component);

SearchSuggestion.prototype.template = function () {
  return `
    <div class="suggestion__body">             
        <span>아이폰 13 pro</span>
        <span>아이패드 에어 4</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
        <span>아이깨끗해</span>
    </div>
  `;
};

export default SearchSuggestion;
