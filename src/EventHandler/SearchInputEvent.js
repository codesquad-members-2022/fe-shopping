import * as domUtil from "/util/domutil.js";
import { ToggleView } from "/View/ToggleView.js";
import { Toggle } from "/Components/Toggle.js";

class SearchInputController {
  constructor(input, toggleParent) {
    this.input = input;
    this.toggleView = new ToggleView(toggleParent);
  }
  initService() {
    this.input.addEventListener("input", this.getSearchingData);
  }

  getSearchingData({ target: { value } }) {
    fetch(`search/${value}`)
      .then((data) => data.json())
      .then((jsonData) => {
        const newHTML = new Toggle(
          jsonData,
          "search--toggle--li",
          "search--toggle--ul"
        ).dom;
      });
  }
}

const test = new SearchInputController(
  domUtil.$(".header__main--searchZone"),
  domUtil.$(".header__main--searchInput")
);
test.initService();
