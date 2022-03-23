import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Component from "./core/Component";
import { store } from "./Store";
import { createExtendsRelation } from "./oop-utils";
import { request } from "./utils";

function App(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(App, Component);

App.prototype.mount = async function () {
  const $header = this.$target.querySelector(".header");
  const $body = this.$target.querySelector(".body");
  const header = new Header($header);
  const body = new Body($body);

  const datas = await Promise.all([
    request("search/category"),
    request("category"),
  ]);
  const [{ results: searchCategoryDatas }, { results: categoryDatas }] = datas;
  store.setState({ searchCategoryDatas, categoryDatas });

  [header, body].forEach((component) => {
    component.initRender();
  });
};

App.prototype.template = function () {
  return `
    <div class="header"></div>
    <div class="body"></div>
    <div class="footer></div>
  `;
};

export default App;
