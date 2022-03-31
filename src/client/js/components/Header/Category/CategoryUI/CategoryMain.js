import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";
import { debounceForSmartLayer } from "../controllers/category";
import {
  handleCMainMouseOut,
  handleCMainMouseOver,
} from "../controllers/categoryMain";

function CategoryMain(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(CategoryMain, Component);

CategoryMain.prototype.setEvent = function () {
  this.addEvent({
    eventType: "mouseover",
    selector: "li",
    callback: debounceForSmartLayer({
      callback: handleCMainMouseOver,
      mouseOn: "main",
    }),
  });
  this.addEvent({
    eventType: "mouseout",
    selector: "li",
    callback: handleCMainMouseOut,
  });
};

CategoryMain.prototype.mount = function () {
  const { categoryDatas } = store.state;
  this.$target.style.boxShadow = categoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";

  const clientRect = this.$target.getBoundingClientRect();
  store.setState({
    mainCategory: {
      clientRect,
    },
  });
};

CategoryMain.prototype.template = function () {
  const { categoryDatas } = store.state;
  return categoryDatas.map(({ name }) => `<li>${name}</li>`).join("");
};

export default CategoryMain;
