import { CurrentSearchStore } from "../../model/current-search-store.js";
import { debounce } from "../../utils/utils.js";

export class SearchInputController {
  constructor() {
    this.$searchInput = document.querySelector(".search-input");
    this.$searchList = document.querySelector(".search-list");
    this.$searchBtn = document.querySelector(".search-btn");
    this.keywordStore = new CurrentSearchStore();
    this.autoCompleteStore;
    this.toggle = false;
  }
  getData() {
    return fetch("./data/fakeDB.json").then((res) => res.json());
  }
  addEvents() {
    this.$searchInput.addEventListener("keyup", (e) =>
      this.inputEnterHandler(e)
    );
    this.$searchInput.addEventListener("click", () => this.inputClickHandler());
    this.$searchBtn.addEventListener("click", () => this.storageClear());
    this.$searchInput.addEventListener("keyup", () =>
      this.autoCompleteHandler(500, this.getData())
    );
    document.addEventListener("click", (e) => this.otherClickHandler(e));
  }

  inputEnterHandler(e) {
    if (e.key === "Enter") {
      localStorage.setItem(`${Date.now()}`, `${this.$searchInput.value}`);
      this.keywordStore.localStorageArr.unshift(this.$searchInput.value);
      this.$searchInput.value = "";
    }
  }

  inputClickHandler() {
    this.toggleOn();

    if (!this.$searchInput.value) {
      if (this.keywordStore.length === 0) {
        this.toggleOff();
        return;
      }

      this.$searchList.innerHTML = "";
      this.$searchList.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;

      const length = this.keywordStore.localStorageArr.length;
      for (let i = 0; i < 8; i++) {
        if (!length) break;
        const keyword = document.createElement("li");
        keyword.textContent = this.keywordStore.localStorageArr[i];
        this.$searchList.appendChild(keyword);
      }
    }
  }

  storageClear() {
    this.keywordStore = [];
    localStorage.clear();
    this.toggleOff();
  }

  async autoCompleteHandler(interval, data) {
    this.toggleOn();

    debounce(interval).then(() => {
      if (!this.$searchInput.value) {
        this.inputClickHandler();
      } else {
        this.$searchList.innerHTML = "";
        data.then((json) => {
          const searchList = json.products
            .filter((v) => v.keyword.includes(this.$searchInput.value))
            .sort((a, b) => b.views - a.views);
          for (let i = 0; i < 10; i++) {
            if (!searchList[i]) break;
            const content = document.createElement("li");
            content.textContent = searchList[i].keyword;
            this.$searchList.appendChild(content);
          }
        });
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
