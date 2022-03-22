import { AutoCompleteStore } from "../../model/autocomplete-store.js";
import { CurrentSearchStore } from "../../model/current-search-store.js";
import { debounce } from "../../utils/utils.js";

export class SearchInputController {
  constructor() {
    this.$searchInput = document.querySelector(".search-input");
    this.$searchList = document.querySelector(".search-list");
    this.$searchBtn = document.querySelector(".search-btn");
    this.recentKeywordStore = new CurrentSearchStore();
    this.autoKeywordStore = new AutoCompleteStore();
    this.toggle = false;
  }

  addEvents() {
    this.$searchInput.addEventListener("keyup", (e) =>
      this.inputEnterHandler(e)
    );
    this.$searchInput.addEventListener("click", () => this.inputClickHandler());
    document.addEventListener("click", (e) => this.otherClickHandler(e));
    this.$searchBtn.addEventListener("click", () => this.storageClear());
    this.$searchInput.addEventListener("keyup", () =>
      this.autoCompleteHandler(500)
    );
  }

  inputEnterHandler(e) {
    if (e.key === "Enter") {
      localStorage.setItem(`${Date.now()}`, `${this.$searchInput.value}`);
      this.recentKeywordStore.localStorageArr.unshift(this.$searchInput.value);
      this.$searchInput.value = "";
    }
  }

  inputClickHandler() {
    this.toggleOn();

    if (!this.$searchInput.value) {
      if (this.recentKeywordStore.length === 0) {
        this.toggleOff();
        return;
      }

      this.reRenderRecentKeyword();
    }
  }

  reRenderRecentKeyword() {
    this.$searchList.innerHTML = "";
    this.$searchList.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;

    const length = this.recentKeywordStore.localStorageArr.length;
    for (let i = 0; i < 8; i++) {
      if (!length) break;
      const keyword = document.createElement("li");
      keyword.textContent = this.recentKeywordStore.localStorageArr[i];
      this.$searchList.appendChild(keyword);
    }
  }

  storageClear() {
    this.recentKeywordStore = [];
    localStorage.clear();
    this.toggleOff();
  }

  autoCompleteHandler(interval) {
    this.toggleOn();

    debounce(interval).then(() => {
      if (!this.$searchInput.value) {
        this.inputClickHandler();
      } else {
        this.reRenderAutoComplete(10);
      }
    });
  }

  reRenderAutoComplete(maxLiNum) {
    this.$searchList.innerHTML = "";
    this.autoKeywordStore.getKeywordData(this.$searchInput.value).then(() => {
      for (let i = 0; i < maxLiNum; i++) {
        if (!this.autoKeywordStore.keywordData) break;
        const content = document.createElement("li");
        content.textContent = this.autoKeywordStore.keywordData[i];
        this.$searchList.appendChild(content);
      }
    });
  }

  otherClickHandler(e) {
    if (e.target.className === "search-input") return;
    if (e.target.parentNode.className !== "search-list is-opened") {
      if (this.toggle) {
        this.toggleOff();
      }
    }
  }

  toggleOn() {
    this.$searchList.classList.add("is-opened");
    this.toggle = true;
  }

  toggleOff() {
    this.$searchList.classList.remove("is-opened");
    this.toggle = false;
  }
}
