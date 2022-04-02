import { computeGrad } from '../../utils/utils.js';

const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  DEFAULT: false,
};

export const globalCategoryStore = {
  mouse: {
    moveDirection: null,
    inGlobalCategory: null,
  },

  setMouseMoveDirection(oldX, oldY, x, y) {
    this.mouse.moveDirection = this.computeMouseMoveDirection(oldX, oldY, x, y);
  },

  didMouseMoveRight() {
    return this.mouse.moveDirection === DIRECTION.RIGHT;
  },

  computeMouseMoveDirection(oldX, oldY, x, y) {
    const grad = computeGrad(oldX, oldY, x, y);
    if (-2 < grad && grad < 2 && oldX < x) return DIRECTION.RIGHT;
    return DIRECTION.DEFAULT;
  },

  isMouseInGlobalCategory() {
    return this.mouse.inGlobalCategory;
  },

  setMouseInGlobalCategory(bool) {
    this.mouse.inGlobalCategory = bool;
  },
};
