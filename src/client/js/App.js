import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Component from "./core/Component";
import { createExtendsRelation } from "./core/oop-utils";

function App(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(App, Component);

App.prototype.mount = function () {
  const $header = this.$target.querySelector(".header");
  const $body = this.$target.querySelector(".body");
  const header = new Header($header);
  const body = new Body($body);
};
App.prototype.template = function () {
  return `
    <div class="header"></div>
    <div class="body"></div>
    <div class="footer></div>
  `;
};

export default App;
