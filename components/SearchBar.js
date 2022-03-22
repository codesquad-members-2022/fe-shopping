import Element from "./Element.js";
import { targetQuerySelector } from "../util/util.js";

class SearchBar extends Element {
  constructor() {
    super();
    this.$search = targetQuerySelector({
      className: "search",
    });
  }

  onFocusInput({ dropDown }) {
    this.$search.addEventListener("focus", (event) => {
      const hasDropBox = true;
      dropDown(hasDropBox);
    });
  }

  render() {
    const { keyword } = this.state;
    this.$search.value = keyword;
  }
}

export default SearchBar;
