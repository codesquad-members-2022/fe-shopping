import constants from "../common/constants.js";
import SearchForm from "../component/SearchForm.js";
import storage from "../util/storage.js";
import { sortAsc } from "../util/util.js";

export default class extends SearchForm {
  constructor({ ...args }, msg) {
    super(args);
    this.msg = msg;
  }

  handleRemoveRecentSearch(e) {
    e.preventDefault();
    const { confirmMsg, completeMsg, cancelMsg } = this.msg;

    if (!confirm(confirmMsg)) {
      alert(cancelMsg);
      return;
    }
    storage.removeFromLocalStorage(constants.recentSearchKeyName);
    this.fillDropdownList();
    alert(completeMsg);
  }

  handleSearchFormMousedown(e) {
    super.handleSearchFormMousedown(e);
    const { target } = e;

    if (target.closest(".search-area-dropdown")) {
      if (target.classList.contains("remove-all")) {
        this.handleRemoveRecentSearch(e);
        return;
      }
    }
  }

  createDropdownInner() {
    const recentSearchAreaTag = `
      <div class="inner">
        <p class="title">최근 검색어</p>
        <ul class="list"></ul>
      </div>

      <div class="recent-search-menu">
        <a href="#" class="remove-all menu-item">전체삭제</a>
        <a href="#" class="remove-off menu-item">최근 검색어 끄기</a>
      </div>
    `;

    this.$dropdown.innerHTML = recentSearchAreaTag;
  }

  createLiElements() {
    const data = this.recentSearchData;
    const tag = data.reduce((prev, cur, idx) => {
      return (
        prev +
        `<li class="recent-search-item">
            <a href="#" class="link" data-idx=${idx}>${cur["input"]}</a>
        </li>`
      );
    }, "");

    return tag;
  }

  fillDropdownList() {
    const dropDownList = this.$dropdown.querySelector(".list");
    const keyName = constants.recentSearchKeyName;
    this.recentSearchData = storage.getLocalStorage(keyName);
    if (!this.recentSearchData) {
      dropDownList.innerHTML = "";
      return;
    }

    const sortKey = "no";
    const dataSortByAsc = sortAsc(this.recentSearchData, sortKey);
    this.setListItemsCnt(dataSortByAsc);

    dropDownList.innerHTML = this.createLiElements();
  }
}
