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
Category.prototype.mount = function () {
  const { categoryDatas, subCategoryDatas } = store.state;
  const $categoryMain = this.$target.querySelector(".category__main");
  const $categorySub = this.$target.querySelector(".category__sub");
  $categoryMain.style.boxShadow = categoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  $categorySub.style.boxShadow = subCategoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  $categorySub.style.height = subCategoryDatas.length
    ? $categoryMain.offsetHeight + "px"
    : 0;
};

Category.prototype.template = function () {
  const { categoryDatas, subCategoryDatas } = store.state;
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
    <ul class="category__sub">
      ${subCategoryDatas.map(({ name }) => `<li>${name}</li>`).join("")}
    </ul>
    <ul class="category__third"></ul>
  `;
};

export default Category;
