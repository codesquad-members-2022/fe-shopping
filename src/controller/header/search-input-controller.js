import { delay } from "../../utils/utils.js";

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
      currentKeywordHandler(e, "Enter", this.keywordStorage, this.$searchInput)
    );
    this.$searchInput.addEventListener(
      "click",
      inputClickHandler(
        this.$searchInput,
        this.$searchList,
        "is-opened",
        this.keywordStorage
      )
    );
    this.$searchBtn.addEventListener("click", () =>
      storageClear(this.keywordStorage, this.$searchList, "is-opened")
    );
    this.$searchInput.addEventListener("keyup", () =>
      autoCompleteHandler(
        this.$searchInput,
        this.$searchList,
        "is-opened",
        this.keywordStorage,
        500,
        this.getData()
      )
    );
  }
}

const currentKeywordHandler = (e, key, storageArr, targetElement) => {
  if (e.key === key) {
    localStorage.setItem(`${targetElement.value}`, `${targetElement.value}`);
    storageArr.push(targetElement.value);
    targetElement.value = "";
  }
};

const inputClickHandler = (
  inputElement,
  ulElement,
  toggleClass,
  storageArr
) => {
  ulElement.classList.add(toggleClass);
  if (!inputElement.value) {
    if (storageArr.length === 0) {
      ulElement.classList.remove(toggleClass);
      return;
    }
    ulElement.innerHTML = "";
    ulElement.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;

    const length = storageArr.length - 1;
    for (let i = 0; i < 8; i++) {
      if (!storageArr[length - i]) break;

      const keyword = document.createElement("li");
      keyword.textContent = localStorage.getItem(storageArr[length - i]);
      ulElement.appendChild(keyword);
    }
  }
};

const storageClear = (storageArr, listElement, toggleClass) => {
  storageArr = [];
  localStorage.clear();
  listElement.classList.remove(toggleClass);
};

const autoCompleteHandler = (
  inputElement,
  ulElement,
  toggleClass,
  storageArr,
  interval,
  data
) => {
  ulElement.classList.add(toggleClass);
  delay(interval).then(() => {
    if (!inputElement.value) {
      inputClickHandler(inputElement, ulElement, toggleClass, storageArr);
    } else {
      ulElement.innerHTML = "";
      data.then((json) => {
        const searchList = json.products
          .filter((v) => v["search-keyword"].includes(inputElement.value))
          .sort((a, b) => b.views - a.views);
        for (let i = 0; i < 10; i++) {
          if (!searchList[i]) break;
          const content = document.createElement("li");
          content.textContent = searchList[i]["search-keyword"];
          ulElement.appendChild(content);
        }
      });
    }
  });
};
