import * as domUtil from "/util/domutil.js";

class mainController {
  constructor() {}
  initService() {
    domUtil
      .$(".header__main--searchZone")
      .addEventListener("input", ({ target: { value } }) => {
        console.log(value);
      });
  }
}

const test = new mainController();
test.initService();
