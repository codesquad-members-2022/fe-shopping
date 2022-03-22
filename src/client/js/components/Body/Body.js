import Component from "../../core/Component";
import { createExtendsRelation } from "../../oop-utils";
import { store } from "../../core/Store";

function Body(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Body, Component);

Body.prototype.setEvent = function () {
  this.addEvent("click", ".increaseBtn", ({ target }) => {
    const { a } = store.state;
    store.setState({ a: a + 1, b: 2 });
  });
};
Body.prototype.template = function () {
  const { a } = store.state;
  return `
    <div>Hello body${a}${store.state.b}</div>
    <button class="increaseBtn">증가</button>
  `;
};

export default Body;
