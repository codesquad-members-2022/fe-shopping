import SearchForm from "../component/SearchForm.js";
import { sortAsc } from "../util/util.js";

export default class extends SearchForm {
  constructor(...args) {
    super(...args);
  }

  // view 모델 에서 해야하는 일
  // set recentSearchData(data) {
  //   console.log(data);
  //   // this.showDropdown();
  //   // this.fillDropdownList(data);
  // }

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
    if (!this.recentSearchData) {
      dropDownList.innerHTML = "";
      return;
    }

    const sortKey = "no";
    const dataSortByAsc = sortAsc(this.recentSearchData, sortKey);
    this.setListItemsCnt(dataSortByAsc);

    dropDownList.innerHTML = createLiElements();
  }
}
