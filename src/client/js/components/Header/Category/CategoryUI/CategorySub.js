import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";

function CategorySub(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(CategorySub, Component);

CategorySub.prototype.mount = function () {
  const { subCategoryDatas } = store.state;
  const $categoryMain =
    this.$target.parentNode.querySelector(".category__main");

  this.$target.style.boxShadow = subCategoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  this.$target.style.height = subCategoryDatas.length
    ? $categoryMain.offsetHeight + "px"
    : 0;
};

CategorySub.prototype.template = function () {
  const { subCategoryDatas } = store.state;
  return subCategoryDatas.map(({ name }) => `<li>${name}</li>`).join("");
};

export default CategorySub;
