import Component from "./core/Component";
import { createExtendsRelation } from "./core/oop-utils";

export default function App(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(App, Component);

App.prototype.template = function () {
  return `<div>Hello World</div>`;
};
