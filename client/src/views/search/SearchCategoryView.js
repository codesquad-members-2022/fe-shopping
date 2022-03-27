import { $ } from '../../utils/util.js';

export default class SearchCategoryView {
  constructor() {
    this.searchCategoryElement = $('.search-selectBox');
  }

  drawCategoryList(data) {
    return /* html */ `
          <ul class="search-list">
            ${data.reduce((prev, cur, index) => {
              return (prev += `<li class="search-item" data-category-id=${index}>${cur}</li>`);
            }, '')}
          </ul>
      `;
  }

  #handleClickEventListener() {
    this.searchCategoryElement.addEventListener('click', this.clickedAnimation);
  }

  run() {
    this.#handleClickEventListener();
  }
}
