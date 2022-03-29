import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";

function CategoryMain(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(CategoryMain, Component);

CategoryMain.prototype.mount = function () {
  const { categoryDatas } = store.state;
  this.$target.style.boxShadow = categoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
};

CategoryMain.prototype.template = function () {
  const { categoryDatas } = store.state;
  return categoryDatas.map(({ name }) => `<li>${name}</li>`).join("");
};

export default CategoryMain;
