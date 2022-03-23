import { dom } from '../../utils/dom.js';

export default class CategoryView {
  constructor(model) {
    this.Model = model;
    this.currentEl = dom.select('.searchForm__current-category');
    this.listEl = dom.select('.searchForm__category-list');
  }

  init() {
    this.renderCategories();
    this.renderCurrentCategory();
    this.addHandlers();
  }

  createItem(category) {
    return `<li data-category="${category}" class="searchForm__category-item">${category}</li>`;
  }

  createItems() {
    const categories = this.Model.getCategories();
    return categories.reduce((acc, category) => acc + this.createItem(category), '');
  }

  renderCategories() {
    this.listEl.insertAdjacentHTML('beforeend', this.createItems());
  }

  renderCurrentCategory() {
    this.currentEl.textContent = this.Model.getCurrentCategory();
  }

  addHandlers() {
    this.currentEl.addEventListener('click', () => this.toggleList.call(this));
    this.listEl.addEventListener('click', (event) => this.selectCategory.call(this, event));
  }

  toggleList() {
    const listEl = this.listEl;
    const show = 'searchForm__category-list--show';
    const hidden = 'searchForm__category-list--hidden';

    if (listEl.classList.contains(show)) {
      listEl.classList.replace(show, hidden);
      return;
    }
    listEl.classList.replace(hidden, show);
  }

  selectCategory(event) {
    const currentCategory = this.currentEl.textContent;
    const selectedCategory = event.target.dataset.category;

    if (!selectedCategory) return;

    if (currentCategory === selectedCategory) {
      this.toggleCategories.call(this);
      return;
    }

    this.Model.setCurrentCategory(selectedCategory);
    this.renderCurrentCategory();
    this.toggleList.call(this);
  }
}
