class SearchCategoryDropBox {
  constructor() {
    this.$search__categories__container = null;
  }

  appendElement({ data = [], appendDropBox }) {
    appendDropBox(data);
  }

  render() {
    this.$search__categories__container.classList.toggle("hidden");
  }
}

export default SearchCategoryDropBox;
