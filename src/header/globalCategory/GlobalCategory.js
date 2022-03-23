import {
  selector,
  addClass,
  removeClass,
  throttle,
  debounce,
  computeGrad,
} from '../../utils/utils.js';

const HIDDEN = 'hidden';
const OPEN = 'is-open';
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

    this.gCategoryCloseDelay = 200;
    this.mouseMoveDirectionSetDelay = 20;
    this.categoryItemOpenDelay = 20;

    this.mouseMoveDirection = null;
    this.isMouseEnterGCategory = null;

    this.init();
  }

  init() {
    this.$gCategory.addEventListener('mouseenter', () => {
      this.isMouseEnterGCategory = true;
      removeClass(HIDDEN, this.$categoryLayer);
    });

    this.$gCategory.addEventListener('mouseleave', () => {
      this.isMouseEnterGCategory = false;
    });

    this.$gCategory.addEventListener(
      'mouseleave',
      debounce(this.closeGCategoryLayer, this.gCategoryCloseDelay)
    );

    /* 스마트 레이어 */
    this.$categoryList.addEventListener(
      'mousemove',
      throttle(this.setMouseMoveDirection(), this.mouseMoveDirectionSetDelay)
    );

    this.$categoryList.addEventListener(
      'mouseover',
      debounce(this.openCategoryItem, this.categoryItemOpenDelay)
    );
  }

  /* **리스너*** */
  setMouseMoveDirection() {
    let oldX = 0;
    let oldY = 0;
    return (e) => {
      const x = e.clientX;
      const y = e.clientY;
      this.mouseMoveDirection = this.computeMouseMoveDirection(
        oldX,
        oldY,
        x,
        y
      );

      oldX = x;
      oldY = y;
    };
  }

  closeGCategoryLayer = () => {
    if (this.isMouseEnterGCategory) return;
    const $selectedItem = selector(`.${OPEN}`, this.$categoryLayer);
    addClass(HIDDEN, this.$categoryLayer);
    removeClass(OPEN, $selectedItem);
  };

  openCategoryItem = (e) => {
    const $depth1Layer = e.target.closest(`.${CATEGORY_LAYER_DEPTH_1}`);
    if ($depth1Layer) return;

    const $categoryItem = e.target.closest(`.${CATEGORY_ITEM}`);
    if (!this.mouseMoveDirection) {
      if (this.$selectedCategoryItem)
        removeClass(OPEN, this.$selectedCategoryItem);
      this.$selectedCategoryItem = $categoryItem;
      addClass(OPEN, $categoryItem);
    }
  };

  /* ********** */

  computeMouseMoveDirection(oldX, oldY, x, y) {
    const grad = computeGrad(oldX, oldY, x, y);
    // if (grad < -2 || grad > 2) {
    //   if (oldY > y) return DIRECTION.UP;
    //   else if (oldY < y) return DIRECTION.DOWN;
    // }
    // if (oldX > x) return DIRECTION.LEFT;
    // else if (oldX < x) return DIRECTION.RIGHT;

    if (-2 < grad && grad < 2 && oldX < x) return DIRECTION.RIGHT;
    return DIRECTION.DEFAULT;
  }
}
