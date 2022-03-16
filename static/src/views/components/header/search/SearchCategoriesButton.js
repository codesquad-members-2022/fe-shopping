export class SearchCategoriesButton {
  constructor() {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$searchCategoriesButton = this.$searchWrap.querySelector('.search-categories-button');
    this.addEventListener();
  }

  updateCategory(selectedCategory) {
    this.$searchCategoriesButton.textContent = selectedCategory;
    this.$searchWrap.querySelector('.search-categories').classList.toggle('active');
  }

  addSearchCategoriesButtonEvent() {
    this.$searchCategoriesButton.addEventListener('click', () => {
      this.$searchWrap.querySelector('.search-categories').classList.toggle('active');
      this.$searchWrap.querySelector('.search-recent-keywords').classList.remove('active');
    });
  }

  addEventListener() {
    this.addSearchCategoriesButtonEvent();
  }
}
