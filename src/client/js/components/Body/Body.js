import Component from "../../core/Component";
import { createExtendsRelation } from "../../core/oop-utils";

function Body(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Body, Component);

Body.prototype.template = function () {
  return `<div>Hello body</div>`;
};

export default Body;
