export default class CategoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
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
    this.view.bound.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(eventTarget) {
    const currentCategory = this.model.getCurrentCategory();
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
