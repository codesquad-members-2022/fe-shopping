// import option from "../common/options.js";
import SearchForm from "../component/SearchForm.js";
import storage from "../util/storage.js";
import {
  sortAsc,
  isEmpty,
  fetchData,
  debounce,
  setDisplayBlock,
} from "../util/util.js";

export default class extends SearchForm {
  constructor({ datasetName, recentSearchValueName, ...args }) {
    super(args);
    this.datasetName = datasetName;
    this.recentSearchValueName = recentSearchValueName;
    // this.message = option.message;
    // this.state = "recent-search";
  }

  // setStateInit() {
  //   this.state = "recent-search";
  //   this.searchWord = "";
  // }

  // setSearchData(data, key) {
  //   if (key) {
  //     this.searchData = data[key];
  //     return;
  //   }
  //   this.searchData = data;
  // }

  // setSearchStateSuggest(word) {
  //   this.state = "suggest-search";
  //   this.setListItemsCnt(this.searchData);
  //   this.searchWord = word;
  // }

  // getSuggestionWord = debounce(() => {
  //   const searchWord = this.$input.value;
  //   const fetchUrl = option.suggestionUrl + searchWord;

  //   const getSuggestionData = (json) =>
  //     json["suggestions"].map((el) => el.value);
  //   this.initSelectedIdx();

  //   fetchData(fetchUrl, getSuggestionData)
  //     .then((json) => this.setSearchData(json))
  //     .then((res) => this.setSearchStateSuggest(searchWord))
  //     .then((res) => this.showDropdown())
  //     .catch((error) => console.error(error));
  // }, option.suggestionDelay);

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

  fillDropdownList(data, state) {
    const dropDownList = this.$dropdown.querySelector(".list");
    dropDownList.innerHTML = this.createLiElements(data, state);
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
        ? cur[this.recentSearchValueName]
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

  // getSearchData() {
  //   if (this.state === "recent-search") {
  //     const keyName = option.recentSearchKeyName;
  //     const recentSearchData = storage.getLocalStorage(keyName);
  //     if (!recentSearchData) {
  //       return [];
  //     }

  //     const sortKey = "no";
  //     const dataSortByAsc = sortAsc(recentSearchData, sortKey);
  //     this.setListItemsCnt(dataSortByAsc);
  //     this.setSearchData(dataSortByAsc);
  //     return dataSortByAsc;
  //   }
  //   return this.searchData;
  // }

  // handleRemoveRecentSearch(e) {
  //   e.preventDefault();
  //   const { confirmMsg, completeMsg, cancelMsg } = this.message;

  //   if (!confirm(confirmMsg)) {
  //     alert(cancelMsg);
  //     return;
  //   }
  //   storage.removeFromLocalStorage(option.recentSearchKeyName);
  //   this.fillDropdownList();
  //   alert(completeMsg);
  // }

  // handleSearchFormMousedown(e) {
  //   super.handleSearchFormMousedown(e);
  //   const { target } = e;

  //   if (target.closest(".search-area-dropdown")) {
  //     if (target.classList.contains("remove-all")) {
  //       this.handleRemoveRecentSearch(e);
  //       return;
  //     }
  //   }
  // }

  // onKeyUp() {
  //   super.onKeyUp();
  //   this.$input.addEventListener("keyup", ({ key }) => {
  //     if (key === "Escape") {
  //       return;
  //     }
  //     if (key === "ArrowDown" || key === "ArrowUp") {
  //       return;
  //     }

  //     if (isEmpty(this.$input.value)) {
  //       this.setStateInit();
  //       return;
  //     }

  //     this.getSuggestionWord();
  //   });
  // }

  // handleSubmitForm(e) {
  //   super.handleSubmitForm(e);
  //   this.setStateInit();
  // }
}
