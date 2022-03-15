import * as domUtil from "/util/domutil.js";
import { ToggleView } from "/View/ToggleView.js";
import { Toggle } from "/Components/Toggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchInputController {
  constructor(input, toggleParent) {
    this.input = input;
    this.toggleView = new ToggleView(toggleParent);
  }
  initService() {
    this.input.addEventListener("input", this.getSearchingData.bind(this));
  }

  getSearchingData({ target: { value } }) {
    fetch_use(
      `search/${value}`,
      (jsonData) =>
        new Toggle(jsonData, "search--toggle--li", "search--toggle--ul").dom
    ).then(this.toggleView.renderToggle.bind(this.toggleView));
  }
}

const test = new SearchInputController(
  domUtil.$(".header__main--searchZone"),
  domUtil.$(".header__main--searchInput")
);

test.initService();
