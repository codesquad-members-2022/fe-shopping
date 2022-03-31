import { targetQuerySelector } from "../util/util.js";

class SearchCategory {
  constructor() {
    this.$selected__category = targetQuerySelector({
      className: "selected__category",
    });
  }

  onClickSearchCategory({ handleClickSearchCatgory }) {
    document.addEventListener("click", ({ target }) => {
      handleClickSearchCatgory(target);
    });
  }

  render(selectedCategory) {
    this.$selected__category.innerText = selectedCategory;
  }
}

export default SearchCategory;
