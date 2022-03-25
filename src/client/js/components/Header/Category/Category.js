import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../oop-utils";
import { debounce } from "../../../utils";
import { store } from "../../../Store";
import {
  handleListMouseOver,
  handleListMouseOut,
} from "./controllers/category";

function Category(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Category, Component);

Category.prototype.setEvent = function () {
  const MOUSEOVER_DELAY_MS = 100;

  this.addEvent({
    eventType: "mouseover",
    selector: ".category__main li",
    callback: debounce({
      msTime: MOUSEOVER_DELAY_MS,
      callback: handleListMouseOver,
    }),
  });
  this.addEvent({
    eventType: "mouseout",
    selector: ".category__main li",
    callback: handleListMouseOut,
  });
};
Category.prototype.mount = function () {};

Category.prototype.template = function () {
  const { categoryDatas } = store.state;
  return `
    <div class="category__icon">
        <i class="fas fa-bars"></i>
    </div>
    <div class="category__text">
        <span>카테고리</span>
    </div>
    <ul class="category__main">
        ${categoryDatas.map(({ name }) => `<li>${name}</li>`).join("")}
    </ul>
    <ul class="category__sub"></ul>
    <ul class="category__third"></ul>
  `;
};

export default Category;
