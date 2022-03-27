import { $ } from '../utils/util.js';

export class MainCategoryView {
  constructor() {
    this.className = 'main-category';
    this.categoryElement = $('.main-category');
  }

  drawCategory(data) {
    return /* html */ `
        <ul class='${this.className}-list'>
            ${Object.keys(data).reduce((prev, key, index) => {
              return (prev += `<li class='${this.className}-item' data-id=${index}>
                  <a class='${this.className}-item__link'>
                    ${data[key].name}
                  </a>
              </li>`);
            }, '')}
        </ul>
    `;
  }

  #handleMouseOverEventListener() {
    this.categoryElement.addEventListener('mouseenter', this.getCategoryDataHandler);
  }

  #handleMouseLeaveEventListener() {
    this.categoryElement.addEventListener('mouseleave', () => {
      const categoryListBox = $('.main-category-list');
      categoryListBox?.remove();
    });
  }

  run() {
    this.#handleMouseOverEventListener();
    this.#handleMouseLeaveEventListener();
  }
}
