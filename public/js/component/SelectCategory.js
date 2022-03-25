import { $ } from '../util.js';

export class SelectCategory {
  constructor() {
    this.$selectCategory = $('.select-category');
    this.$selectCategoryContent = $('.select-category-content');
    this.$selectCategoryOption = $('.select-category-option');
  }

  setSelectCategoryListener() {
    this.$selectCategory.addEventListener('click', ({ target }) => {
      this.$selectCategoryOption.classList.toggle('showCategory');
      if (!target.closest('.select-category-option')) return;
      this.$selectCategoryContent.innerHTML = target.textContent;
    });
  }
}
