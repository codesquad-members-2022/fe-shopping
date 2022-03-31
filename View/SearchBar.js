import { targetQuerySelector } from "../util/util.js";

class SearchBar {
  constructor() {
    this.$search = targetQuerySelector({
      className: "search",
    });
  }

  onFocusInput({ handleFocusInput }) {
    this.$search.addEventListener("focus", (event) => {
      handleFocusInput();
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
