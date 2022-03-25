import {
  isEmpty,
  setDisplayNone,
  setDisplayBlock,
  $,
  $$,
} from "../util/util.js";

export default class {
  constructor({
    searchFormArea,
    datasetName,
    localStorage,
    selectedIdxClassName,
  }) {
    this.$searchFormArea = searchFormArea;
    this.$form = this.getElFromArea(".search-form");
    this.$input = this.getElFromArea(".search-input");
    this.$dropdown = this.getElFromArea(".search-area-dropdown");

    this.selectedIdx = -1;
    this.datasetName = datasetName;
    this.localStorage = localStorage;
    this.selectedIdxClassName = selectedIdxClassName;
  }

  getElFromArea(selector) {
    return this.$searchFormArea.querySelector(selector);
  }

  clearInput() {
    this.$form.reset();
  }

  createDropdownInner() {
    this.$dropdown.innerHTML = `
    <div class="inner">
      <ul class="list"></ul>
    </div>`;
  }

  fillDropdownList() {
    const dropDownList = this.$dropdown.querySelector(".list");
    dropDownList.innerHTML = "";
  }

  renderDropdown() {
    setDisplayBlock(this.$dropdown);
    this.createDropdownInner();
    this.fillDropdownList();
  }

  hideDropdown() {
    setDisplayNone(this.$dropdown);
  }

  onFocus() {
    this.$input.addEventListener("focus", this.handleFocusInput);
  }

  onBlur() {
    this.$input.addEventListener("blur", this.handleBlurInput);
  }

  onFocusInOut() {
    this.onFocus();
    this.onBlur();
  }

  addClassSelectedIdx(selectedIdx) {
    const itemsSelector = `[data-${this.datasetName}]`;
    const items = [...$$(itemsSelector)];

    items.forEach((item, idx) => {
      if (idx === selectedIdx) {
        item.classList.add(this.selectedIdxClassName);
      } else {
        item.classList.remove(this.selectedIdxClassName);
      }
    });

    this.inputSelectedWord(selectedIdx);
  }

  inputSelectedWord(selectedIdx) {
    const selectedWord = $(
      `[data-${this.datasetName}="${selectedIdx}"]`
    ).innerText;
    this.$input.value = selectedWord;
  }

  onKeyUp() {
    this.$input.addEventListener("keyup", ({ key }) => {
      if (key === "Escape") {
        this.handleEscKeyUp();
        return;
      }
      if (key === "ArrowDown" || key === "ArrowUp") {
        this.handleArrowKeyUp(key);
        return;
      }

      if (isEmpty(this.$input.value)) {
        return;
      }
      return;
    });
  }

  onSubmit() {
    this.$form.addEventListener("submit", this.handleSubmit);
  }

  inputSelectedTxt(target) {
    const selectedTxt = target.innerText;
    this.$input.value = selectedTxt;
  }

  onMouseDown() {
    this.$searchFormArea.addEventListener("mousedown", this.handleMouseDown);
  }

  onEvent() {
    this.onFocusInOut();
    this.onKeyUp();
    this.onSubmit();
    this.onMouseDown();
  }

  init() {
    this.onEvent();
  }
}
