import {
  selector,
  addClass,
  removeClass,
  toggleClass,
  hasAscendant,
} from '../../utils/utils.js';

const CATEGORY = 'search-bar-category';
const CATEGORY_LIST = 'search-bar-category-list';
const CATEGORY_ITEM = 'search-bar-category-item';
const CATEGORY_NAME = 'search-bar-category-name';
const CLOSE = 'close';

export class SearchBarCategory {
  constructor() {
    this.$category = selector(`.${CATEGORY}`);
    this.$categoryList = selector(`.${CATEGORY_LIST}`);
    this.$categoryName = selector(`.${CATEGORY_NAME}`);
    this.open = false;

    this.$category.addEventListener('click', (e) => {
      this.toggle();

      if (!e.target.classList.contains(CATEGORY_ITEM)) return;
      this.$categoryName.textContent = e.target.textContent;
    });

    document.body.addEventListener('click', (e) => {
      if (!hasAscendant(this.$category, e.target)) this.close();
    });
  }

  isOpen() {
    return this.open;
  }

  open() {
    this.open = true;
    removeClass(CLOSE, this.$categoryList);
  }

  close() {
    this.open = false;
    addClass(CLOSE, this.$categoryList);
  }

  toggle() {
    this.open = this.open ? false : true;
    toggleClass(CLOSE, this.$categoryList);
  }

  getCategoryName() {
    return this.$categoryName.textContent;
  }
}
