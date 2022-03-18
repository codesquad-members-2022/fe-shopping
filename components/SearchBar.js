import Element from "./Element.js";
import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "../util/util.js";

class SearchBar extends Element {
  constructor() {
    super();
    this.$search = null;
    this.$search__word__dropbox = null;
  }

  appendElement({ data = "" }) {
    this.$search = targetQuerySelector({
      className: "search",
    });

    const $search__bar = targetQuerySelector({
      className: "search__bar",
    });

    const $latestSearch__data = createLiListTemplate(data);

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
  }

  handleFocusInput() {
    this.$search.addEventListener("focus", (event) => {
      this.$search__word__dropbox.style.visibility = "visible";
    });
  }

  handleClickWhenDropDown() {
    const $search__delete = targetQuerySelector({
      className: "search__delete",
    });

    const $current__search__off = targetQuerySelector({
      className: "current__search__off",
    });

    document.addEventListener("click", ({ target }) => {
      if (
        target === this.$search ||
        target === $search__delete ||
        target === $current__search__off
      ) {
        return;
      } else {
        this.$search__word__dropbox.style.visibility = "hidden";
      }
    });
  }

  render() {
    this.$search__word__dropbox.style.visibility = "hidden";
  }
}

export default SearchBar;
