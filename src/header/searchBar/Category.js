import {
  selector,
  addClass,
  removeClass,
  toggleClass,
  hasAscendant,
} from '../../utils/utils.js';

// classname
const CATEGORY = 'search-bar-category';
const CATEGORY_LIST = 'search-bar-category-list';
const CATEGORY_ITEM = 'search-bar-category-item';
const CATEGORY_NAME = 'search-bar-category-name';
const CATEGORY_HIDDEN = 'close';

export class SearchBarCategory {
  constructor() {
    this.$category = selector(`.${CATEGORY}`);
    this.$categoryList = selector(`.${CATEGORY_LIST}`);
    this.$categoryName = selector(`.${CATEGORY_NAME}`);

    // state
    this.isLayerOpen = false;

    // init
    this.init();
  }

  init() {
    this.$category.addEventListener('click', (e) => {
      this.toggleLayer();

      if (!e.target.classList.contains(CATEGORY_ITEM)) return;
      this.$categoryName.textContent = e.target.textContent;
    });

    document.body.addEventListener('click', (e) => {
      if (!hasAscendant(this.$category, e.target)) this.closeLayer();
    });
  }

  openLayer() {
    this.isLayerOpen = true;
    removeClass(CATEGORY_HIDDEN, this.$categoryList);
  }

  closeLayer() {
    this.isLayerOpen = false;
    addClass(CATEGORY_HIDDEN, this.$categoryList);
  }

  toggleLayer() {
    this.isLayerOpen = this.isLayerOpen ? false : true;
    toggleClass(CATEGORY_HIDDEN, this.$categoryList);
  }

  getCategoryName() {
    return this.$categoryName.textContent;
  }
}
