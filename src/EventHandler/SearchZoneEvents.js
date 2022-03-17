import * as domUtil from "/util/domutil.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "/View/HeaderView.js";
import { Toggle } from "/Components/Toggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchZoneController {
  constructor(inputDom, menuDom) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
  }
  initService() {
    // console.log(domUtil.$(".header__main--inputWrapper").event);
    this.inputDom.addEventListener("input", this.onInputSearchInput);
    this.inputDom.addEventListener("keydown", this.onKeyDownEnter);
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
      "search/menu/toggle",
      (jsonData) =>
        new Toggle(jsonData, "search--menu--li", "search--menu--ul").dom
    ).then(menuView.renderToggle.bind(menuView));
  }

  onKeyDownEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }
}

const test = new SearchZoneController(
  ".header__main--searchZone",
  ".header__main--inputMenu"
);
const viewTest = new SearchInputToggleView(".header__main--inputWrapper");
const menuView = new SearchMenuToggleView(".header__main--inputMenuButton");

test.initService();
