import Element from "./Element.js";

class SearchCategoryDropBox extends Element {
  constructor() {
    super();
    this.$search__categories__container = null;
  }

  appendElement({ data = [], appendDropBox }) {
    appendDropBox(data);
  }

  render() {
    this.$search__categories__container.style.visibility = "hidden";
  }
}

export default SearchCategoryDropBox;
