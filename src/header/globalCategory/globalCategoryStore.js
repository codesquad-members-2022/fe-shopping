import { computeGrad } from '../../utils/utils.js';

export const globalCategoryStore = {
  DIRECTION: {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    DEFAULT: false,
  },
  mouseMoveDirection: null,
  mouseEntersCategory: null,

  setMouseMoveDirection(oldX, oldY, x, y) {
    this.mouseMoveDirection = this.computeMouseMoveDirection(oldX, oldY, x, y);
  },

  didMouseMoveRight() {
    return this.mouseMoveDirection === this.DIRECTION.RIGHT;
  },

  computeMouseMoveDirection(oldX, oldY, x, y) {
    const grad = computeGrad(oldX, oldY, x, y);
    if (-2 < grad && grad < 2 && oldX < x) return this.DIRECTION.RIGHT;
    return this.DIRECTION.DEFAULT;
  },

  isMouseOnCategory() {
    return this.mouseEntersCategory;
  },
};
