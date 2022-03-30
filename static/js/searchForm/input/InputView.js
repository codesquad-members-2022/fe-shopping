import { dom } from "../../utils/dom.js";

export default class InputView {
  constructor() {
    this.bound = {};
    this.inputEl = dom.select(".searchForm__input");
    this.resultEl = dom.select(".searchForm__result");
    this.submitButtonEl = dom.select(".searchForm__submit");
    this.show = "searchForm__result--show";
    this.hidden = "searchForm__result--hidden";
  }

  addHandler() {
    this.inputEl.addEventListener("input", (event) => {
      if (event.target.value === "") {
        this.bound.clearAutoCompleteTimer();
        this.bound.resetResult();
        this.hideResult();
        return;
      }
      this.bound.setAutoCompleteTimer(event);
    });

    this.inputEl.addEventListener("focus", () => {
      if (this.bound.isHistoryEmpty()) return;
      this.showResult();
    });

    this.inputEl.addEventListener("blur", () => this.hideResult());
    this.submitButtonEl.addEventListener("click", (event) => this.bound.submitInputValue(event));
  }

  clear() {
    this.inputEl.value = "";
  }

  showResult() {
    this.resultEl.classList.replace(this.hidden, this.show);
  }

  hideResult() {
    this.resultEl.classList.replace(this.show, this.hidden);
  }
}
