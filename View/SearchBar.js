import { targetQuerySelector } from "../util/util.js";

class SearchBar {
  constructor() {
    this.$search = targetQuerySelector({
      className: "search",
    });
  }

  onFocusInput({ dropDown }) {
    this.$search.addEventListener("focus", (event) => {
      dropDown();
    });
  }

  onChangeInput({ handleChangeInput }) {
    handleChangeInput();
  }

  onKeyupKeywords({ handleKeyupKeywords }) {
    handleKeyupKeywords();
  }

  render({ keyword }) {
    this.$search.value = keyword;
  }
}

export default SearchBar;
