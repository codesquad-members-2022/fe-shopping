import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../oop-utils";
import { store } from "../../../Store";
import { delay } from "../../../utils";
import CategoryMain from "./CategoryUI/CategoryMain";
import CategorySub from "./CategoryUI/CategorySub";

function Category(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Category, Component);

Category.prototype.setEvent = function () {
  const $categoryMain = this.$target.querySelector(".category__main");
  const $categorySub = this.$target.querySelector(".category__sub");
  $categoryMain.addEventListener("mouseenter", () => {
    store.setState({ mouseOnCategory: "main" });
  });
  $categoryMain.addEventListener("mouseleave", () => {
    store.setState({ mouseOnCategory: "" });
    delay(0).then(() => {
      if (store.state.mouseOnCategory === "") {
        store.setState({ subCategoryDatas: [] });
      }
    });
  });
  $categorySub.addEventListener("mouseenter", () => {
    store.setState({ mouseOnCategory: "sub" });
  });
  $categorySub.addEventListener("mouseleave", () => {
    store.setState({ mouseOnCategory: "" });
    delay(0).then(() => {
      const { mouseOnCategory } = store.state;
      if (mouseOnCategory === "") {
        store.setState({ thirdCategoryDatas: [], subCategoryDatas: [] });
      }
    });
  });
};

Category.prototype.mount = function () {
  const $categoryMain = this.$target.querySelector(".category__main");
  const $categorySub = this.$target.querySelector(".category__sub");
  const categoryMain = new CategoryMain($categoryMain);
  const categorySub = new CategorySub($categorySub);

  [categoryMain, categorySub].forEach((component) => component.initRender());
};

Category.prototype.template = function () {
  return `
    <div class="category__icon">
        <i class="fas fa-bars"></i>
    </div>
    <div class="category__text">
        <span>카테고리</span>
    </div>
    <ul class="category__main"></ul>
    <ul class="category__sub"></ul>
    <ul class="category__third"></ul>
  `;
};

export default Category;
