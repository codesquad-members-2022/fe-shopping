export default class CategoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.currentEl = view.currentEl;
    this.listEl = view.listEl;
    this.show = 'searchForm__category-list--show';
    this.hidden = 'searchForm__category-list--hidden';
  }

  init() {
    this.view.init();

    this.view.toggleList = this.toggleList.bind(this);
    this.view.hideList = this.hideList.bind(this);
    this.view.selectCategory = this.selectCategory.bind(this);
  }

  toggleList() {
    if (this.listEl.classList.contains(this.show)) {
      this.listEl.classList.replace(this.show, this.hidden);
      return;
    }
    this.listEl.classList.replace(this.hidden, this.show);
  }

  hideList(eventTarget) {
    if (
      eventTarget === this.currentEl ||
      eventTarget.parentNode === this.listEl ||
      this.listEl.classList.contains(this.hidden)
    )
      return;

    this.listEl.classList.replace(this.show, this.hidden);
  }

  selectCategory(eventTarget) {
    const currentCategory = this.currentEl.textContent;
    const selectedCategory = eventTarget.dataset.category;

    if (!selectedCategory) return;

    if (currentCategory === selectedCategory) {
      this.toggleList();
      return;
    }

    this.model.setCurrentCategory(selectedCategory);
    this.view.renderCurrentCategory();
    this.toggleList();
  }
}
