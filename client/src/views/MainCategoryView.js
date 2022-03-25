import { $ } from '../utils/util.js';
import CategoryView from './CategoryView.js';

export class MainCategoryView extends CategoryView {
  constructor() {
    super();
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
    this.categoryElement.addEventListener('mouseover', () => {
      const categoryListElement = $('.main-category-list');
      if (categoryListElement) {
        return;
      }
      this.categoryElement.insertAdjacentHTML('beforeend', this.drawCategory(this.getCategoryDataHandler()));
    });
  }

  run() {
    this.#handleMouseOverEventListener();
  }
}
