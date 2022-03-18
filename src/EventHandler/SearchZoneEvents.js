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
  constructor(inputDom, menuDom, inputView, menuView) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
    this.inputView = inputView;
    this.menuView = menuView;
    this.searched = [];
  }
  initService() {
    this.inputDom.addEventListener("input", this.onInputSearchInput.bind(this));
    this.inputDom.addEventListener("keydown", this.onKeyDownEnter.bind(this));
    this.menuDom.addEventListener("click", this.onClickSearchMenu.bind(this));
    document.body.addEventListener("click", this.removeSearchMenu.bind(this));
  }

  onInputSearchInput({ target: { value } }) {
    fetch_use(
      `search/${value}`,
      (jsonData) => new SearchInputToggle(jsonData).dom
    )
      .then(this.inputView.renderToggle.bind(this.inputView))
      .then(() => this.inputView.renderHistory());
  }

  onClickSearchMenu() {
    fetch_use(
      "search/menu/toggle",
      (jsonData) => new SearchMenuToggle(jsonData).dom
    ).then(this.menuView.renderToggle.bind(this.menuView));
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

export { SearchZoneController };
