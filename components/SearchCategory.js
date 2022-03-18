import Element from "./Element.js";
import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "../util/util.js";

class SearchCategory extends Element {
  constructor() {
    super();
    this.$selected__category = null;
    this.$search__categories__container = null;
    this.$search__category = null;
  }

  appendElement({ data = "전체" }) {
    const $categories = createLiListTemplate(data);
    this.$search__categories__container = htmlString2htmlElement({
      tag: "ul",
      htmlString: $categories,
      className: "search__dropbox",
    });

    this.$selected__category = targetQuerySelector({
      className: "selected__category",
    });

    this.$search__category = targetQuerySelector({
      className: "search__category",
    });

    this.$selected__category.insertAdjacentElement(
      "afterend",
      this.$search__categories__container
    );
  }

  handleClickSearchCategory() {
    document.addEventListener("click", ({ target }) => {
      const { visibility } = this.$search__categories__container.style;
      if (visibility === "visible") {
        this.$search__categories__container.style.visibility = "hidden";
        const $currentCategory = target.closest("li");

        // Todo : 함수화하여 이중if문을 if문 하나만 사용하도록 리팩토링
        if (
          $currentCategory?.parentNode === this.$search__categories__container
        ) {
          const selectedCategoryText = $currentCategory.textContent;
          this.$selected__category.innerText = selectedCategoryText;
        }
      } else if (
        target === this.$search__category ||
        target === this.$selected__category
      ) {
        this.$search__categories__container.style.visibility = "visible";
      }
    });
  }

  render() {
    this.$search__categories__container.style.visibility = "hidden";
  }
}

export default SearchCategory;
