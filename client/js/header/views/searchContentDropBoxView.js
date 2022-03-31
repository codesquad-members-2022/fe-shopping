import { getLocalStorageForArray } from "../../component/local-storage.js";

export const SearchContentDropBox = function (dropbox) {
  this.searchViewContentDropBox = dropbox;
  this.searchViewContentDropBox.info.dropBox = this.searchViewContentDropBox.createDropBoxTemplate(
    false,
    this.searchViewContentDropBox.info.dropBoxClassName,
    null,
    this.recentSearchArea()
  );
  this.recentSearchKeyWord = "recentSearchKeyWord";
};

SearchContentDropBox.prototype = {
  constructor: SearchContentDropBox,
  render(data, keyWord) {
    if (keyWord.length === 0) {
      data = null;
    }
    return (this.searchViewContentDropBox.info.dropBox = this.searchViewContentDropBox.createDropBoxTemplate(
      data,
      "search-bar__view-content",
      keyWord,
      this.recentSearchArea()
    ));
  },
  createRecentSearchByLocalStorage(curLocalStorage) {
    return curLocalStorage
      .reverse()
      .reduce(
        (divElement, content) => divElement + `<div class="recentSearch-area__text">${content}</div>`,
        ""
      );
  },
  recentSearchArea() {
    const curLocalStorage = getLocalStorageForArray(this.recentSearchKeyWord);
    return `
    <div class="recentSearch-area">
      <div class="recentSearch-area__header">
      <div class="recentSearch-area__text">최근 검색어</div>
      </div>
      <div class="recentSearch-area__main">
        ${curLocalStorage.length > 0 ? this.createRecentSearchByLocalStorage(curLocalStorage) : ""}
      </div>
      <div class="recentSearch-area__footer">
        <div class="recentSearch-area__text">전체삭제</div>
        <div class="recentSearch-area__text">최근검색어끄기</div>
      </div>
    </div>
    `;
  },
  onDropBoxRenderEvent() {
    this.searchViewContentDropBox.onDropBoxRenderEvent();
  },
  reRenderDropBox() {
    this.searchViewContentDropBox.reRenderDropBox();
  },
};
