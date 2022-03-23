import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import {
  handleInputFocusIn,
  handleInputFocusOut,
  handleKeyupWithFocus,
  handleSearchIconClick,
} from "../controllers/searchInput";

function SearchInput(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchInput, Component);

SearchInput.prototype.setEvent = function () {
  this.addEvent({
    eventType: "focusout",
    selector: "input[type='text']",
    callback: handleInputFocusOut,
  });
  this.addEvent({
    eventType: "focusin",
    selector: "input[type='text']",
    callback: handleInputFocusIn,
  });
  this.addEvent({
    eventType: "keyup",
    selector: "input[type='text']",
    callback: handleKeyupWithFocus,
  });
  this.addEvent({
    eventType: "click",
    selector: ".fa-search",
    callback: handleSearchIconClick,
  });
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
