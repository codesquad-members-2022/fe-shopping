import { DropDown } from './view/dropdown.js';

export class Controller {
  constructor() {
    this.dropDown = new DropDown();
  }

  init() {
    this.dropDown.renderSelectCategory();
    this.inputSelectCategoryEvent();
  }

  inputSelectCategoryEvent() {
    const $select = document.querySelector('.select__category');
    $select.addEventListener('click', (e) => {
      this.dropDown.showCategory();

      if (e.target.nodeName === 'A') {
        this.dropDown.selectCategory(e);
      }
    });
  }
}
