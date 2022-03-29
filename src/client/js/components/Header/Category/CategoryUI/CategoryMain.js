import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../Store";
import { debounce } from "../../../../utils";
import {
  handleListMouseOut,
  handleListMouseOver,
} from "../controllers/category";

function CategoryMain(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(CategoryMain, Component);

CategoryMain.prototype.setEvent = function () {
  const MOUSEOVER_DELAY_MS = 100;
  this.addEvent({
    eventType: "mouseover",
    selector: "li",
    callback: debounce({
      msTime: MOUSEOVER_DELAY_MS,
      callback: handleListMouseOver,
    }),
  });
  this.addEvent({
    eventType: "mouseout",
    selector: "li",
    callback: handleListMouseOut,
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
