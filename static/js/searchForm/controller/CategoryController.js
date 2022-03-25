export default class CategoryController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.currentEl = view.currentEl;
    this.listEl = view.listEl;
    this.classNameForShow = 'searchForm__category-list--show';
    this.classNameForHidden = 'searchForm__category-list--hidden';
  }

  init() {
    this.view.init();

    this.view.toggleList = this.toggleList.bind(this);
    this.view.hiddenList = this.hiddenList.bind(this);
    this.view.selectCategory = this.selectCategory.bind(this);
  }

  toggleList() {
    const [show, hidden] = [this.classNameForShow, this.classNameForHidden];

    if (this.listEl.classList.contains(show)) {
      this.listEl.classList.replace(show, hidden);
      return;
    }
    this.listEl.classList.replace(hidden, show);
  }

  hiddenList(eventTarget) {
    const [show, hidden] = [this.classNameForShow, this.classNameForHidden];

    if (
      eventTarget === this.currentEl ||
      eventTarget.parentNode === this.listEl ||
      this.listEl.classList.contains(hidden)
    )
      return;

    this.listEl.classList.replace(show, hidden);
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
