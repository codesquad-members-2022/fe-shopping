import { debounce } from "../../utils/utils.js";
import { Core } from "../core.js";

export class SearchInput extends Core {
  constructor() {
    super();
    this.template = this.getTemplate();
  }

  getTemplate() {
    const template = document.createElement("div");
    template.className = "search-input-wrap";
    template.innerHTML = `
    <input
      type="text"
      class="search-input"
      placeholder="찾고 싶은 상품을 검색해보세요!"
    />
    <button class="search-btn"></button>
    <div class="search-list">
      <ul class="search-list__contents"></ul>
      <div class="search-helper">
        <span class="search-helper__delete">전체삭제</span>
        <span class="search-helper__off">최근검색어끄기</span>
      </div>
    </div>
  </div>`;

    return template;
  }

  on() {
    this.$searchInput.addEventListener("keyup", (e) =>
      this.inputEnterHandler(e)
    );
    this.$searchInput.addEventListener("click", () => this.inputClickHandler());
    document.addEventListener("click", (e) => this.otherClickHandler(e));
    this.$deleteBtn.addEventListener("click", () => this.storageClear());
    this.$searchInput.addEventListener(
      "keyup",
      debounce(() => this.autoCompleteHandler(), 500)
    );
  }

  reRenderRecentKeyword(storeArr) {
    this.$searchListUl.innerHTML = "";
    this.$searchListUl.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;
    storeArr.forEach((recentKeyword) => {
      const keyword = document.createElement("li");
      keyword.textContent = recentKeyword;
      this.$searchListUl.append(keyword);
    });
    this.$searchHelper.style.display = "block";
  }

  reRenderAutoComplete(storeArr) {
    this.$searchListUl.innerHTML = "";
    storeArr.forEach((keyword) => {
      const content = document.createElement("li");
      content.textContent = keyword;
      this.$searchListUl.append(content);
    });
    this.$searchHelper.style.display = "none";
  }
}
