import {
  selector,
  addClass,
  removeClass,
  throttle,
  debounce,
  computeGrad,
} from '../../utils/utils.js';
import { globalCategoryStore as gCategoryStore } from './globalCategoryStore.js';

const DISPLAY_NONE = 'hidden';
const LAYER_OPEN = 'is-open';

const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  DEFAULT: false,
};

const G_CATEGORY_BTN = 'category-btn';
const CATEGORY_LAYER = 'category-layer';
const CATEGORY_LAYER_DEPTH_1 = 'category-layer-depth-1';
const CATEGORY_LIST = 'category-list';
const CATEGORY_ITEM = 'category-item';

export class GlobalCategory {
  constructor() {
    this.$gCategory = selector(`.${G_CATEGORY_BTN}`);

    this.$categoryLayer = selector(`.${CATEGORY_LAYER}`);
    this.$categoryList = selector(`.${CATEGORY_LIST}`);
    this.$selectedCategoryItem = null;

    this.mouseMoveDirection = null;
    this.isMouseEnterGCategory = null;

    this.init();
  }

  init() {
    const gCategoryCloseDelay = 200;
    const mouseMoveDirectionSetDelay = 20;
    const categoryItemOpenDelay = 20;

    this.$gCategory.addEventListener('mouseenter', () => {
      this.isMouseEnterGCategory = true;
      removeClass(DISPLAY_NONE, this.$categoryLayer);
    });

    this.$gCategory.addEventListener('mouseleave', () => {
      this.isMouseEnterGCategory = false;
    });

    this.$gCategory.addEventListener(
      'mouseleave',
      debounce(this.closeGCategoryLayer, gCategoryCloseDelay)
    );

    /* 스마트 레이어 */
    this.$categoryList.addEventListener(
      'mousemove',
      throttle(this.handleMouseMove(), mouseMoveDirectionSetDelay)
    );

    this.$categoryList.addEventListener(
      'mouseover',
      debounce(this.openCategoryItem, categoryItemOpenDelay)
    );
  }

  /* **리스너*** */

  handleMouseMove() {
    let oldX = 0;
    let oldY = 0;
    return (e) => {
      const x = e.clientX;
      const y = e.clientY;
      gCategoryStore.setMouseMoveDirection(oldX, oldY, x, y);
      oldX = x;
      oldY = y;
    };
  }

  closeGCategoryLayer = () => {
    if (this.isMouseEnterGCategory) return;
    const $selectedItem = selector(`.${LAYER_OPEN}`, this.$categoryLayer);
    addClass(DISPLAY_NONE, this.$categoryLayer);
    removeClass(LAYER_OPEN, $selectedItem);
  };

  openCategoryItem = (e) => {
    const $depth1Layer = e.target.closest(`.${CATEGORY_LAYER_DEPTH_1}`);
    if ($depth1Layer) return;

    const $categoryItem = e.target.closest(`.${CATEGORY_ITEM}`);
    if (!gCategoryStore.didMouseMoveRight()) {
      if (this.$selectedCategoryItem) removeClass(LAYER_OPEN, this.$selectedCategoryItem);
      this.$selectedCategoryItem = $categoryItem;
      addClass(LAYER_OPEN, $categoryItem);
    }
  };

  /* ********** */
}
