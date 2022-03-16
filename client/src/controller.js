import { SelectCategory } from './view/selectCategory.js';

export class Controller {
  constructor() {
    this.selectCategory = new SelectCategory();
  }

  init() {
    this.setSelectCategoryEvents();
  }

  setSelectCategoryEvents() {
    const $select = document.querySelector('.select__category');
    $select.addEventListener('click', (e) => {
      this.selectCategory.showCategory();

      if (e.target.nodeName === 'A') {
        this.selectCategory.selectCategory(e);
      }
    });
  }
}
