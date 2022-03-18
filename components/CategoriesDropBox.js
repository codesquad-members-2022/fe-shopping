import Element from "./Element.js";
import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "../util/util.js";

class CategoriesDropBox extends Element {
  constructor() {
    super();
    this.$selected__category = null;
    this.$search__categories__container = null;
    this.$search__category = null;
  }

  appendElement({ data = [] }) {
    const $categories = createLiListTemplate(data);
    this.$search__categories__container = htmlString2htmlElement({
      tag: "ul",
      htmlString: $categories,
      className: "search__dropbox",
    });

    this.$selected__category = targetQuerySelector({
      className: "selected__category",
    });

    this.$selected__category.insertAdjacentElement(
      "afterend",
      this.$search__categories__container
    );
    this.setState(data);
  }

  handleClickSearchCategory() {
    document.addEventListener("click", ({ target }) => {
      const { visibility } = this.$search__categories__container.style;
      if (visibility === "hidden") {
        if (
          target === this.$search__category ||
          target === this.$selected__category
        ) {
          this.$search__categories__container.style.visibility = "visible";
        }
      }
    });
  }

  render() {
    this.$search__categories__container.style.visibility = "hidden";
  }
}

export default CategoriesDropBox;
