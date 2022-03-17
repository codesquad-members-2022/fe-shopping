import * as domUtil from "/util/domutil.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "/View/HeaderView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "../Components/headerToggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchZoneController {
  constructor(inputDom, menuDom) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
    this.searched = [];
  }
  initService() {
    this.inputDom.addEventListener("input", this.onInputSearchInput);
    this.inputDom.addEventListener("keydown", this.onKeyDownEnter.bind(this));
    this.menuDom.addEventListener("click", this.onClickSearchMenu);
    document.body.addEventListener("click", this.removeSearchMenu.bind(this));
  }

  onInputSearchInput({ target: { value } }) {
    fetch_use(
      `search/${value}`,
      (jsonData) => new SearchInputToggle(jsonData).dom
    )
      .then(viewTest.renderToggle.bind(viewTest))
      .then(() => viewTest.renderHistroy);
  }

  onClickSearchMenu() {
    fetch_use(
      "search/menu/toggle",
      (jsonData) => new SearchMenuToggle(jsonData).dom
    ).then(menuView.renderToggle.bind(menuView));
  }
  onKeyDownEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.searched = new Set([
        ...this.searched,
        domUtil.$(".header__main--searchInput").value,
      ]);
    }
  }

  removeSearchMenu() {
    if (this.menuDom.parentNode.children.length > 1) {
      this.menuDom.parentNode.children[1].remove();
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
