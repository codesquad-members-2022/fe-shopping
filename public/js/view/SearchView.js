import SearchForm from "../component/SearchForm.js";
import { setDisplayBlock } from "../util/dom.js";

export default class extends SearchForm {
  constructor({ datasetName, dataName, ...args }) {
    super(args);
    this.datasetName = datasetName;
    this.localStorageDataName = dataName;
  }

  createDropdownInner(state) {
    const innerTag = {
      "recent-search": `
        <div class="inner">
          <p class="title">최근 검색어</p>
          <ul class="list"></ul>
        </div>

        <div class="recent-search-menu">
          <a href="#" class="remove-all menu-item">전체삭제</a>
          <a href="#" class="remove-off menu-item">최근 검색어 끄기</a>
        </div>`,

      "suggest-search": `
        <div class="inner">
          <ul class="list">
          </ul>
        </div>`,
    };

    this.$dropdown.innerHTML = innerTag[state];
  }

  renderDropdown(state) {
    setDisplayBlock(this.$dropdown);
    this.createDropdownInner(state);
  }

  fillDropdownList({ data, state, searchWord }) {
    const dropDownList = this.$dropdown.querySelector(".list");
    dropDownList.innerHTML = this.createLiElements({ data, state, searchWord });
  }

  createLiElements({ data, state, searchWord }) {
    if (!data) return "";

    const tag = data.reduce((prev, cur, idx) => {
      return prev + this.getLiTemplate({ cur, idx, state, searchWord });
    }, "");

    return tag;
  }

  getLiTemplate({ cur, idx, state, searchWord }) {
    const item =
      state === "recent-search"
        ? cur[this.localStorageDataName]
        : cur.split(searchWord).join(`<strong>${searchWord}</strong>`);

    const template = {
      "recent-search": `
        <li class="recent-search-item">
          <a href="#" class="link" data-${this.datasetName}=${idx}>${item}</a>
        </li>`,
      "suggest-search": `
        <li class="suggest-search-item">
          <a href="#" class="link" data-${this.datasetName}=${idx}>${item}</a>
        </li>
      `,
    };
    return template[state];
  }

  onKeyUp() {
    super.onKeyUp();
    this.$input.addEventListener("keyup", ({ key }) => {
      if (key === "Escape") {
        return;
      }
      if (key === "ArrowDown" || key === "ArrowUp") {
        return;
      }

      this.getSuggestionWord(this.$input.value);
    });
  }
}
