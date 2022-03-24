import { $ } from "../utils/utils.js";
import { upKey, downKey } from "../constants/constants.js";

export class SearchHelperController {
  constructor(keywordStore, searchBox, categoryOptionBox) {
    this.keywordStore = keywordStore;
    this.searchBox = searchBox;
    this.categoryOptionBox = categoryOptionBox;
    this.setState();
    this.setEvent();
  }

  setState() {
    this.searchHelperBox = $(".search-helper-box");
    this.input = $(".search-box__input-text");
  }

  setEvent() {
    this.searchHelperBox.addEventListener("mouseover", ({ target }) => {
      this.checkFocus(target, "on");
    });

    this.searchHelperBox.addEventListener("mouseout", ({ target }) => {
      this.checkFocus(target, "out");
    });

    document.addEventListener("keydown", (e) => {
      !e.isComposing && //
        this.checkArrowKey(e.key) &&
        this.checkOpenBox() &&
        this.updateFocusIndex(e.key);
    });
  }

  checkFocus(keywordElement, focus) {
    if (!this.isKeywordList(keywordElement)) return;
    this.outFocusKeyword();
    if (focus === "on") this.onKeyword(keywordElement);
  }

  isKeywordList(keywordElement) {
    return keywordElement.tagName === "LI";
  }

  onKeyword(keywordElement) {
    const control = "mouse";
    const box = this.decideFocusBox();
    this.keywordStore.changeFocusIndex(control, keywordElement, box);
    this.onFocusKeyword(keywordElement);
  }

  checkArrowKey(key) {
    return key === upKey || key === downKey;
  }

  decideFocusBox() {
    if (this.keywordStore.focusBox === "categoryBox") return "category";
    if (this.keywordStore.focusBox === "autoCompletionBox") return "autoCompletion";
    else return "recentSearch";
  }

  checkOpenBox() {
    return this.keywordStore.focusBox !== "";
  }

  updateFocusIndex(ArrowKey) {
    this.outFocusKeyword();
    this.updateFocusKeyword(ArrowKey);
  }

  updateFocusKeyword(ArrowKey) {
    const box = this.decideFocusBox();
    const control = "keyboard";
    const changedIndex = this.keywordStore.changeFocusIndex(control, ArrowKey, box);
    const focuskeywordElement = this.keywordStore.getFocusedKeywordElement(changedIndex, box);
    if (!focuskeywordElement) return;
    this.searchBox.updateSearchBox(focuskeywordElement, box);
    this.onFocusKeyword(focuskeywordElement);
    if (box === "category") this.scrollCategory(ArrowKey);
  }

  scrollCategory(ArrowKey) {
    if (!this.keywordStore.focusIndex) this.categoryOptionBox.initScrollCategory();
    this.categoryOptionBox.scrollCategory(ArrowKey);
  }

  onFocusKeyword(keywordElement) {
    keywordElement.classList.add("selected-keyword");
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    focusKeywordElement && focusKeywordElement.classList.remove("selected-keyword");
  }
}
