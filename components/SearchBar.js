import Element from "./Element.js";
import { targetQuerySelector } from "../util/util.js";

class SearchBar extends Element {
  constructor() {
    super();
    this.$search = null;
  }

  appendElement() {
    this.$search = targetQuerySelector({
      className: "search",
    });
  }

  handleFocusInput() {
    this.$search.addEventListener("focus", (event) => {
      const $search__word__dropbox = targetQuerySelector({
        className: "search__word__dropbox",
      });
      $search__word__dropbox.style.visibility = "visible";
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
}

export default SearchBar;
