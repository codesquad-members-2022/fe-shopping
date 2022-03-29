import { dom } from '../../utils/dom.js';

export default class CategoryView {
  constructor() {
    this.bound = {};
    this.currentEl = dom.select('.searchForm__current-category');
    this.listEl = dom.select('.searchForm__category-list');
  }

  addHandlers() {
    this.currentEl.addEventListener('click', () => this.bound.toggleList());
    this.listEl.addEventListener('click', (event) => this.bound.selectCategory(event.target));
    dom.select('body').addEventListener('click', (event) => this.bound.hideList(event.target));
  }

  createItem(category) {
    return `<li data-category="${category}" class="searchForm__category-item">${category}</li>`;
  }

  createItems(categories) {
    return categories.reduce((acc, category) => acc + this.createItem(category), '');
  }

  renderCategories(categories) {
    this.listEl.insertAdjacentHTML('beforeend', this.createItems(categories));
  }

  renderCurrentCategory(currentCategory) {
    this.currentEl.textContent = currentCategory;
  }
}
