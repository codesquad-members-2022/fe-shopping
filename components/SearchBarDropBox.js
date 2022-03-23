import Element from "./Element.js";

class SearchBarDropBox extends Element {
  constructor() {
    super();
    this.$search__word__dropbox = null;
  }

  appendElement({ data = "", appendSearchBarDropBox }) {
    appendSearchBarDropBox(data);
  }

  onClickDocumentWhenDropDown({ handleClickOutDropBox }) {
    handleClickOutDropBox();
  }

  onKeyupKeywords({ handleKeyupKeywords }) {
    handleKeyupKeywords();
  }

  render() {
    this.$search__word__dropbox.style.visibility = "visible";
  }
}

export default SearchBarDropBox;
