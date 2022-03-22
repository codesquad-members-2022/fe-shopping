import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import {
  handleArrowKeydown,
  handleInputFocusIn,
  handleInputFocusOut,
  handleKeyupWithFocus,
} from "../controllers/searchInput";

function SearchInput(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchInput, Component);

SearchInput.prototype.setEvent = function () {
  this.addEvent("focusout", "input[type='text']", handleInputFocusOut);
  this.addEvent("focusin", "input[type='text']", handleInputFocusIn);
  this.addEvent("keyup", "input[type='text']", handleKeyupWithFocus);
  this.addEvent("keydown", "input[type='text']", handleArrowKeydown);
};

SearchInput.prototype.template = function () {
  return `
    <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!"/>
    <span class="input__icon">
        <i class="fas fa-microphone"></i>
    </span>
    <span class="input__icon">
        <i class="fas fa-search"></i>
    </span>
  `;
};

export default SearchInput;
