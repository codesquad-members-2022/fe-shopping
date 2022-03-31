import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";
import { debounceForSmartLayer } from "../controllers/category";
import {
  handleCSubMouseOut,
  handleCSubMouseOver,
} from "../controllers/categorySub";

function CategorySub(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(CategorySub, Component);

CategorySub.prototype.setEvent = function () {
  this.addEvent({
    eventType: "mouseover",
    selector: "li",
    callback: debounceForSmartLayer({
      callback: handleCSubMouseOver,
      mouseOn: "sub",
    }),
  });
  this.addEvent({
    eventType: "mouseout",
    selector: "li",
    callback: handleCSubMouseOut,
  });
};

CategorySub.prototype.mount = function () {
  const {
    subCategoryDatas,
    mainCategory: { clientRect },
  } = store.state;

  const subClientRect = this.$target.getBoundingClientRect();
  store.setState({
    subCategory: {
      clientRect: subClientRect,
    },
  });
  this.$target.style.boxShadow = subCategoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  this.$target.style.height = subCategoryDatas.length
    ? clientRect.height + "px"
    : 0;
};

CategorySub.prototype.template = function () {
  const { subCategoryDatas } = store.state;
  return subCategoryDatas.map(({ name }) => `<li>${name}</li>`).join("");
};

export default CategorySub;
