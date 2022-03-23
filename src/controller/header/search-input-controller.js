import { AutoCompleteStore } from "../../model/autocomplete-store.js";
import { RecentKeywordStore } from "../../model/recent-keyword-store.js";
import { debounce } from "../../utils/utils.js";

export class SearchInputController {
  constructor() {
    this.$searchInput = document.querySelector(".search-input");
    this.$searchList = document.querySelector(".search-list");
    this.$searchBtn = document.querySelector(".search-btn");
    this.recentKeywordStore = new RecentKeywordStore();
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
    this.$searchInput.addEventListener(
      "keyup",
      debounce(() => this.autoCompleteHandler(), 500)
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
      if (this.recentKeywordStore.localStorageArr.length === 0) {
        this.toggleOff();
        return;
      }
      this.reRenderRecentKeyword();
    }
  }

  reRenderRecentKeyword() {
    this.recentKeywordStore.getLocalStorage();

    this.$searchList.innerHTML = "";
    this.$searchList.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;
    this.recentKeywordStore.localStorageArr.forEach((recentKeyword) => {
      const keyword = document.createElement("li");
      keyword.textContent = recentKeyword;
      this.$searchList.appendChild(keyword);
    });
  }

  storageClear() {
    localStorage.clear();
    this.recentKeywordStore.localStorageArr = [];
    this.toggleOff();
    this.$searchList.innerHTML = "";
  }

  autoCompleteHandler() {
    this.toggleOn();
    if (!this.$searchInput.value) {
      this.inputClickHandler();
    } else {
      this.reRenderAutoComplete();
    }
  }

  reRenderAutoComplete() {
    this.$searchList.innerHTML = "";
    this.autoKeywordStore.getKeywordData(this.$searchInput.value).then(() => {
      this.autoKeywordStore.keywordData.forEach((keyword) => {
        const content = document.createElement("li");
        content.textContent = keyword;
        this.$searchList.appendChild(content);
      });
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
