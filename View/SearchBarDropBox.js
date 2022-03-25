import {
  targetQuerySelector,
  createLiListTemplate,
  htmlString2htmlElement,
} from "../util/util.js";

class SearchBarDropBox {
  constructor() {
    this.$search__word__dropbox = null;
    this.keywords = null; // Todo: dataset으로 리팩토링
  }

  appendElement({ data = "", appendSearchBarDropBox }) {
    const $search__bar = targetQuerySelector({
      className: "search__bar",
    });

    const liClissName = "header__input__keyword";
    const $latestSearch__data = createLiListTemplate(data, liClissName);

    const htmlString = `
              <ul>
                ${$latestSearch__data}
              </ul>
              <button class="search__delete">전체삭제</button>
              <button class="current__search__off">최근검색어끄기</button>
            `;

    this.$search__word__dropbox = htmlString2htmlElement({
      htmlString,
      className: "search__word__dropbox",
    });

    $search__bar.insertAdjacentElement("afterend", this.$search__word__dropbox);

    appendSearchBarDropBox();
  }

  onClickDocumentWhenDropDown({ handleClickOutDropBox }) {
    document.addEventListener("click", ({ target }) => {
      const $search__delete = targetQuerySelector({
        className: "search__delete",
      });

      const $current__search__off = targetQuerySelector({
        className: "current__search__off",
      });

      const $search = targetQuerySelector({
        className: "search",
      });

      const isAreaNotHiddenDropBox =
        target === $search ||
        target === $search__delete ||
        target === $current__search__off;

      if (isAreaNotHiddenDropBox) {
        return;
      }

      handleClickOutDropBox();
    });
  }

  render({ isBarDropBoxVisible = null, keyupKeyword = null }) {
    if (keyupKeyword) {
      const [keywordId, keywordStyle] = keyupKeyword;
      this.keywords = this.$search__word__dropbox.children[0].children; // Todo: dataset으로 리팩토링
      this.keywords[keywordId].style.textDecoration = keywordStyle;
    }

    if (isBarDropBoxVisible === null) {
      return;
    }

    const isShowing = isBarDropBoxVisible ? "visible" : "hidden";
    this.$search__word__dropbox.style.visibility = isShowing;
  }
}

export default SearchBarDropBox;
