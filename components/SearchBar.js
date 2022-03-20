import Element from "./Element.js";
import { targetQuerySelector } from "../util/util.js";

class SearchBar extends Element {
  constructor() {
    super();
    this.$search = targetQuerySelector({
      className: "search",
    });
  }

  handleFocusInput({ dropDown }) {
    this.$search.addEventListener("focus", (event) => {
      const hasDropBox = true;
      dropDown(hasDropBox);
    });
  }
}

export default SearchBar;
