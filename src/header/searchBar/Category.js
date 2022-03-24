import { selector, addClass, toggleClass } from '../../utils/utils.js';

const CATEGORY = 'search-bar-category';
const CATEGORY_LIST = 'search-bar-category-list';
const CATEGORY_ITEM = 'search-bar-category-item';
const CATEGORY_NAME = 'search-bar-category-name';
const CATEGORY_HIDDEN = 'close';

export class SearchBarCategory {
  constructor() {
    this.$category = selector(`.${CATEGORY}`);
    this.$categoryName = selector(`.${CATEGORY_NAME}`);
    this.$categoryList = selector(`.${CATEGORY_LIST}`);
  }

  init() {
    this.$category.addEventListener('click', this.handleClickCategory);
  }

  /* **리스너*** */
  handleClickCategory = (e) => {
    this.toggleLayer();

    if (!e.target.classList.contains(CATEGORY_ITEM)) return;
    this.$categoryName.textContent = e.target.textContent;
  };
  /* ********** */

  closeLayer() {
    addClass(CATEGORY_HIDDEN, this.$categoryList);
  }

  toggleLayer() {
    toggleClass(CATEGORY_HIDDEN, this.$categoryList);
  }
}
