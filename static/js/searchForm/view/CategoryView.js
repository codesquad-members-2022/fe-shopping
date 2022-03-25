import { dom } from '../../utils/dom.js';

export default class CategoryView {
  constructor({ model }) {
    this.model = model;
    this.currentEl = dom.select('.searchForm__current-category');
    this.listEl = dom.select('.searchForm__category-list');
  }

  init() {
    this.renderCategories();
    this.renderCurrentCategory();
    this.addHandlers();
  }

  addHandlers() {
    this.currentEl.addEventListener('click', () => this.toggleList());
    this.listEl.addEventListener('click', (event) => this.selectCategory(event.target));
    dom.select('body').addEventListener('click', (event) => this.hiddenList(event.target));
  }

  createItem(category) {
    return `<li data-category="${category}" class="searchForm__category-item">${category}</li>`;
  }

  createItems() {
    const categories = this.model.getCategories();
    return categories.reduce((acc, category) => acc + this.createItem(category), '');
  }

  renderCategories() {
    this.listEl.insertAdjacentHTML('beforeend', this.createItems());
  }

  renderCurrentCategory() {
    const currentCategory = this.model.getCurrentCategory();
    this.currentEl.textContent = currentCategory;
  }
}
