import { dom } from "../../utils/dom.js";

export default class CategoryView {
  constructor({ currentCategoryEl, categoryListEl }) {
    this.bound = {};
    this.currentEl = currentCategoryEl;
    this.listEl = categoryListEl;
    this.className = {
      show: "show",
      hidden: "hidden",
    };
  }

  addHandler() {
    this.currentEl.addEventListener("click", () => this.bound.toggleList());
    this.listEl.addEventListener("click", (event) => this.bound.selectCategory(event.target));
    dom.select("body").addEventListener("click", (event) => this.bound.hideListFromEventTarget(event.target));
  }

  createItem(category) {
    return `<li data-category="${category}" class="searchForm__category-item">${category}</li>`;
  }

  createItems(categories) {
    return categories.reduce((acc, category) => acc + this.createItem(category), "");
  }

  renderCategories(categories) {
    this.listEl.insertAdjacentHTML("beforeend", this.createItems(categories));
  }

  renderCurrentCategory(currentCategory) {
    this.currentEl.textContent = currentCategory;
  }

  showList() {
    this.listEl.classList.replace(this.className.hidden, this.className.show);
  }

  hideList() {
    this.listEl.classList.replace(this.className.show, this.className.hidden);
  }
}
