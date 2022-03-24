import Component from "../../../core/Component";
import { createExtendsRelation } from "../../../oop-utils";
import { debounce } from "../../../utils";
import { store } from "../../../Store";

function Category(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Category, Component);

Category.prototype.setEvent = function () {
  this.addEvent({
    eventType: "mouseover",
    selector: ".category__main li",
    callback: ({ target }) => {
      // debounce({
      //   baseTarget: target,
      //   msTime: 200,
      //   callback: () => {
      //     console.log("디디바바우운ㄴ시싱");
      //   },
      // });
      console.log(target.value);
    },
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
