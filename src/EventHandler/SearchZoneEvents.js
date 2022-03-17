import * as domUtil from "/util/domutil.js";
import { ToggleView } from "/View/ToggleView.js";
import { Toggle } from "/Components/Toggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchZoneController {
  constructor(inputDom, menuDom) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
  }
  initService() {
    this.inputDom.addEventListener("input", this.onInputSearchInput);
    this.menuDom.addEventListener("click", this.onClickSearchMenu);
  }

  onInputSearchInput({ target: { value } }) {
    fetch_use(
      `search/${value}`,
      (jsonData) =>
        new Toggle(jsonData, "search--toggle--li", "search--toggle--ul").dom
    ).then(viewTest.renderToggle.bind(viewTest));
  }

  onClickSearchMenu() {
    fetch_use(
      "search/menu",
      (jsonData) =>
        new Toggle(jsonData, "search--menu--li", "search--menu--ul").dom
    ).then(menuView.renderToggle.bind(menuView));
  }
}

const test = new SearchZoneController(
  ".header__main--searchZone",
  ".header__main--inputMenu"
);
const viewTest = new ToggleView(".header__main--inputWrapper");
const menuView = new ToggleView(".header__main--inputMenu");

test.initService();
