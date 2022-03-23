import constants from "../common/constants.js";
import {
  isEmpty,
  setDisplayNone,
  setDisplayBlock,
  $,
  $$,
} from "../util/util.js";

export default class {
  constructor({ searchFormArea, datasetName, localStorage }) {
    this.$searchFormArea = searchFormArea;
    this.$form = this.getElFromArea(".search-form");
    this.$input = this.getElFromArea(".search-input");
    this.$dropdown = this.getElFromArea(".search-area-dropdown");

    this.selectedIdx = -1;
    this.datasetName = datasetName;
    this.localStorage = localStorage;
  }

  initSelectedIdx() {
    const initialIdx = -1;
    this.selectedIdx = initialIdx;
  }

  setListItemsCnt(data) {
    this.listItemsCnt = data.length;
  }

  getElFromArea(selector) {
    return this.$searchFormArea.querySelector(selector);
  }

  clearInput() {
    this.$form.reset();
  }

  /* CREATE ELEMENTS */
  createDropdownInner() {
    this.$dropdown.innerHTML = `
    <div class="inner">
      <ul class="list"></ul>
    </div>`;
  }

  createLiElements() {
    const tag = `<li></li>`;
    return tag;
  }

  fillDropdownList() {
    const dropDownList = this.$dropdown.querySelector(".list");
    dropDownList.innerHTML = "";
  }

  /* SHOW, HIDE ELEMENT */
  showDropdown() {
    setDisplayBlock(this.$dropdown);
    this.createDropdownInner();
    this.fillDropdownList();
  }

  hideDropDown() {
    this.initSelectedIdx();
    setDisplayNone(this.$dropdown);
  }
  /* FOCUS EVENT */

  onFocus() {
    this.$input.addEventListener("focus", () => {
      this.showDropdown();
    });
  }

  onBlur() {
    this.$input.addEventListener("blur", () => {
      this.hideDropDown();
    });
  }

  onFocusInOut() {
    this.onFocus();
    this.onBlur();
  }

  /* KEY UP EVENT */
  handleEscKeyUp() {
    this.hideDropDown();
  }

  computeIdx(key) {
    const vaildIdx = 0;
    const firstIdx = 0;
    const lastIdx = this.listItemsCnt - 1;

    const isValidIdx = (idx) => idx >= vaildIdx;
    const isOverMaxIdx = (idx) => idx > lastIdx;
    const getNextIdx = (idx) => idx + 1;
    const getPrevIdx = (idx) => idx - 1;

    const compute = {
      ArrowDown() {
        if (!isValidIdx(this.selectedIdx)) {
          this.selectedIdx = firstIdx;
          return;
        }

        this.selectedIdx = getNextIdx(this.selectedIdx);
        if (isOverMaxIdx(this.selectedIdx)) {
          this.selectedIdx = firstIdx;
        }
      },
      ArrowUp() {
        this.selectedIdx = getPrevIdx(this.selectedIdx);
        if (!isValidIdx(this.selectedIdx)) {
          this.selectedIdx = lastIdx;
          return;
        }
      },
    };

    return compute[key].bind(this);
  }

  addClassSelectedIdx(commonSelector, className) {
    const items = [...$$(commonSelector)];

    items.forEach((item, idx) => {
      if (idx === this.selectedIdx) {
        item.classList.add(className);
      } else {
        item.classList.remove(className);
      }
    });
  }

  inputSelectedWord() {
    const selectedWord = $(
      `[data-${this.datasetName}="${this.selectedIdx}"]`
    ).innerText;
    this.$input.value = selectedWord;
  }

  handleArrowUpDownKeyUp(key) {
    if (!this.listItemsCnt) return;
    const className = "focus";

    this.computeIdx(key)();
    this.addClassSelectedIdx(`[data-${this.datasetName}]`, className);
    this.inputSelectedWord();
  }

  onKeyUp() {
    this.$input.addEventListener("keyup", ({ key }) => {
      if (key === "Escape") {
        this.handleEscKeyUp();
        return;
      }

      if (key === "ArrowDown" || key === "ArrowUp") {
        this.handleArrowUpDownKeyUp(key);
        return;
      }

      if (isEmpty(this.$input)) {
        this.initSelectedIdx();
        // TODO: 최근검색어가 표시되도록
        this.showDropdown();
        return;
      }
    });
  }

  /* SUBMIT EVENT */

  storeItemLocalStorage(key, val) {
    this.localStorage.storeItem(key, val);
  }

  handleSubmitForm(e) {
    // 현재 검색 기능이 동작하지 않으므로 preventDefault() 적용
    e.preventDefault();

    if (isEmpty(this.$input.value)) {
      return;
    }

    const keyName = constants.recentSearchKeyName;
    const inputTxt = this.$input.value;
    this.storeItemLocalStorage(keyName, inputTxt);

    this.clearInput();
    this.fillDropdownList();
  }

  onSubmit() {
    this.$form.addEventListener("submit", (e) => {
      this.handleSubmitForm(e);
    });
  }

  /* MOUSE DOWN EVENT */
  handleSearchFormItems(target) {
    const selectedText = target.innerText;
    this.$input.value = selectedText;
  }

  handleSearchFormMousedown(e) {
    const { target } = e;
    if (target.closest(".search-area-dropdown")) {
      if (target.classList.contains("link")) {
        this.handleSearchFormItems(target);
        return;
      }
    }
  }

  onMouseDown() {
    this.$searchFormArea.addEventListener("mousedown", (e) => {
      this.handleSearchFormMousedown(e);
    });
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
