export default class CategoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.currentEl = view.currentEl;
    this.listEl = view.listEl;
  }

  init() {
    this.initView();
    this.bindMethods();
    this.view.addHandler();
  }

  initView() {
    const categories = this.model.getCategories();
    const currentCategory = this.model.getCurrentCategory();
    this.view.renderCategories(categories);
    this.view.renderCurrentCategory(currentCategory);
  }

  bindMethods() {
    this.view.bound.hideListFromEventTarget = this.hideListFromEventTarget.bind(this);
    this.view.bound.selectCategory = this.selectCategory.bind(this);
  }

  hideListFromEventTarget(eventTarget) {
    if (
      eventTarget === this.currentEl ||
      eventTarget.parentNode === this.listEl ||
      this.listEl.classList.contains(this.view.hidden)
    )
      return;

    this.view.hideList();
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
    this.view.renderCurrentCategory(selectedCategory);
    this.view.toggleList();
  }
}
