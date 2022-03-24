import { $ } from '../utils/util.js';

export class CategoryView {
  constructor() {
    this.categoryElement = $('.category');
  }

  drawMainCategory(data) {
    return /* html */ `
        <ul class="category-list">
            ${Object.keys(data).reduce((prev, key, index) => {
              return (prev += `<li class="category-item" data-id=${index}>
                  <a class="category-item__link">
                    ${data[key].name}
                  </a>
              </li>`);
            }, '')}
        </ul>
    `;
  }

  #handleMouseOverEventListener() {
    this.categoryElement.addEventListener('mouseover', () => {
      const categoryListElement = $('.category-list');
      if (categoryListElement) {
        return;
      }
      this.categoryElement.insertAdjacentHTML('beforeend', this.drawMainCategory(this.getCategoryDataHandler()));
    });
  }

  run() {
    this.#handleMouseOverEventListener();
  }
}
