import { $ } from "../utils/utils.js";

const form = $(".search-keyword__input");
const input = $(".search-keyword__input-text");

export class SearchKeyword {
  constructor(keywordStore, rendering) {
    this.keywordStore = keywordStore;
    this.rendering = rendering;
    this.init();
  }

  init() {
    this.initEventListeners();
  }

  initEventListeners() {
    input.addEventListener("focus", () => {
      this.onFocusSearchForm();
    });

    input.addEventListener("blur", () => {
      this.outFocusSearchForm();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.isBlank()) return;
      this.inputKeyword();
    });
  }

  onFocusSearchForm() {
    const updatedIndex = this.keywordStore.updateFocusIndex();
    this.rendering.showHistoryKeyword();
    const keywordElement = this.keywordStore.getFocusKeywordElement(updatedIndex);
    if (!keywordElement) return;
    this.rendering.onFocusKeyword(keywordElement);
  }

  outFocusSearchForm() {
    this.rendering.hiddenHistoryKeyword();
    this.outFocusKeyword();
  }

  outFocusKeyword() {
    const focusKeywordElement = $(".selected-keyword");
    if (focusKeywordElement) this.rendering.outFocusKeyword(focusKeywordElement);
  }

  inputKeyword() {
    const keyword = input.value;
    this.keywordStore.saveKeyword(keyword);
    this.rendering.historyKeyword([keyword]);
    if (this.keywordStore.isMaxKeywordNum()) this.rendering.removeFirstKeyword();
  }

  isBlank() {
    return input.value.trim().length === 0;
  }
}
