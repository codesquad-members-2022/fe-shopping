import Element from "./Element.js";
import { targetQuerySelector } from "../util/util.js";

class SearchCategory extends Element {
  constructor() {
    super();
    this.$selected__category = targetQuerySelector({
      className: "selected__category",
    });
    this.$search__category = null;
  }

  handleClickSearchCategory() {
    document.addEventListener("click", ({ target }) => {
      const $search__categories__container = targetQuerySelector({
        className: "search__dropbox",
      });

      const visibility = $search__categories__container?.style?.visibility;
      if (visibility !== "visible") {
        return;
      }

      $search__categories__container.style.visibility = "hidden";
      const $currentCategory = target.closest("li");

      if ($currentCategory?.parentNode !== $search__categories__container) {
        return;
      }

      const selectedCategoryText = $currentCategory.textContent;
      this.setState(selectedCategoryText || "전체");
    });
  }

  render() {
    this.$selected__category.innerText = this.state;
  }
}

export default SearchCategory;
