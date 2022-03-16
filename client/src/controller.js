import { selectCategory } from './view/selectCategory.js';

export class Controller {
  constructor() {
    this.selectCategory = new selectCategory();
  }

  init() {
    this.inputSelectCategoryEvent();
  }

  inputSelectCategoryEvent() {
    const $select = document.querySelector('.select__category');
    $select.addEventListener('click', (e) => {
      this.selectCategory.showCategory();

      if (e.target.nodeName === 'A') {
        this.selectCategory.selectCategory(e);
      }
    });
  }
}
