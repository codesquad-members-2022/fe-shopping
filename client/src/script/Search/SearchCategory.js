export default class SearchCategory {
  constructor(categories) {
    this.$category = document.querySelector(".search-category");
    this.categories = categories;
    this._selectedItem = categories[0];
    this.render();
  }
  selectItem({dataset: {categoryId}, innerText}) {
    this._selectedItem = {categoryId: categoryId, value: innerText};
    this.render();
  }
  render() {
    this.$category.innerHTML = `
    <div class="search-category__selected">
      ${this._selectedItem.value}
    </div>
    <div class="search-category-button"></div>
    <div class="search-category-list">
      <ul>
        ${this.categories.map((item) => `<li><a href="#" data-category-id="${item.categoryId}">${item.value}</a></li>`).join("")}
      </ul>
    </div>
    `;
  }
}
