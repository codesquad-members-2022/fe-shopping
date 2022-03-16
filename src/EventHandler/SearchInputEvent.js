import * as domUtil from "/util/domutil.js";
import { ToggleView } from "/View/ToggleView.js";
import { Toggle } from "/Components/Toggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchInputController {
  constructor(inputDom) {
    this.inputDom = inputDom;
  }
  initService() {
    this.inputDom.addEventListener("input", this.onInputSearchZone.bind(this));
  }

  onInputSearchZone({ target: { value } }) {
    fetch_use(
      `search/${value}`,
      (jsonData) =>
        new Toggle(jsonData, "search--toggle--li", "search--toggle--ul").dom
    ).then(viewTest.renderToggle.bind(viewTest));
  }
}

const test = new SearchInputController(domUtil.$(".header__main--searchZone"));
const viewTest = new ToggleView(domUtil.$(".header__main--inputWrapper"));

test.initService();
