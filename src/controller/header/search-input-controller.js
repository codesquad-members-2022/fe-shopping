import { debounce } from "../../utils/utils.js";

export class SearchInputController {
  constructor() {
    this.$searchInput = document.querySelector(".search-input");
    this.$searchList = document.querySelector(".search-list");
    this.$searchBtn = document.querySelector(".search-btn");
    this.keywordStorage = [];
  }
  getData() {
    return fetch("./data/fakeDB.json").then((res) => res.json());
  }
  addEvents() {
    this.$searchInput.addEventListener("keyup", (e) =>
      this.inputEnterHandler(e)
    );
    this.$searchInput.addEventListener("click", () => this.inputClickHandler());
    this.$searchBtn.addEventListener("click", this.storageClear);
    this.$searchInput.addEventListener("keyup", () =>
      this.autoCompleteHandler(500, this.getData())
    );
  }

  inputEnterHandler(e) {
    if (e.key === "Enter") {
      localStorage.setItem(
        `${this.$searchInput.value}`,
        `${this.$searchInput.value}`
      );
      this.keywordStorage.push(this.$searchInput.value);
      this.$searchInput.value = "";
    }
  }

  inputClickHandler() {
    this.$searchList.classList.add("is-opened");
    if (!this.$searchInput.value) {
      if (this.keywordStorage.length === 0) {
        this.$searchList.classList.remove("is-opened");
        return;
      }
      this.$searchList.innerHTML = "";
      this.$searchList.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;

      const length = this.keywordStorage.length - 1;
      for (let i = 0; i < 8; i++) {
        if (!this.keywordStorage[length - i]) break;

        const keyword = document.createElement("li");
        keyword.textContent = localStorage.getItem(
          this.keywordStorage[length - i]
        );
        this.$searchList.appendChild(keyword);
      }
    }
  }

  storageClear() {
    this.keywordStorage = [];
    localStorage.clear();
    this.$searchList.classList.remove("in-opened");
  }

  autoCompleteHandler(interval, data) {
    this.$searchList.classList.add("is-opened");

    debounce(interval).then(() => {
      if (!this.$searchInput.value) {
        this.inputClickHandler();
      } else {
        this.$searchList.innerHTML = "";
        data.then((json) => {
          const searchList = json.products
            .filter((v) =>
              v["search-keyword"].includes(this.$searchInput.value)
            )
            .sort((a, b) => b.views - a.views);
          for (let i = 0; i < 10; i++) {
            if (!searchList[i]) break;
            const content = document.createElement("li");
            content.textContent = searchList[i]["search-keyword"];
            this.$searchList.appendChild(content);
          }
        });
      }
    });
  }
}
