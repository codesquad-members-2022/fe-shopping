import * as domUtil from "/util/domutil.js";

class SearchInputController {
  constructor(input) {
    this.input = input;
  }
  initService() {
    this.input.addEventListener("input", this.getSearchingData);
  }

  getSearchingData({ target: { value } }) {
    fetch(`search/${value}`).then(console.log);
  }
}

const test = new SearchInputController(domUtil.$(".header__main--searchZone"));
test.initService();
