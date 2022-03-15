import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";
import {
  handleInputFocusIn,
  handleInputFocusOut,
  handleKeyupWithFocus,
} from "../controllers/searchInput";

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
  this.addEvent(
    "focusout",
    "input[type='text']",
    handleInputFocusOut.bind(this)
  );
  this.addEvent("focusin", "input[type='text']", handleInputFocusIn.bind(this));
  this.addEvent("keyup", "input[type='text']", handleKeyupWithFocus.bind(this));
};

SearchInput.prototype.mount = function () {
  const $input = this.$target.querySelector("input");
  const curInput = $input.value;
  if (curInput) {
    $input.focus();
    $input.value = "";
    $input.value = curInput;
  }
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

  `;
};

export default SearchInput;
