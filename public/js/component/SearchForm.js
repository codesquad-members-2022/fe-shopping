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

  showDropdown() {
    setDisplayBlock(this.$dropdown);
  }

  hideDropDown() {
    this.initSelectedIdx();
    setDisplayNone(this.$dropdown);
  }

  getElFromArea(selector) {
    return this.$searchFormArea.querySelector(selector);
  }

  /* FOCUS EVENT */

  onFocus() {
    this.$input.addEventListener("focus", () => {
      // 뷰를 표시한다
      this.showDropdown();

      // TODO:  최근검색어를 표시한다.
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

    return compute[key];
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
    const selectedWord = $(`[data-${this.datasetName}]`).innerTextl;
    this.$input.value = selectedWord;
  }

  handleArrowUpDownKeyUp(key) {
    if (!this.listItemsCnt) return;

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
        // TODO: 최근 검색어표시 되어야함
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

    if (isEmpty(this.$input)) {
      return;
    }

    const keyName = "recent-search";
    const inputTxt = this.$input.value;
    this.storeItemLocalStorage(keyName, inputTxt);
  }

  onSubmit() {
    this.$form.addEventListener("submit", (e) => {
      this.handleSubmitForm(e);
    });
  }

  onMouseDown() {}

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
