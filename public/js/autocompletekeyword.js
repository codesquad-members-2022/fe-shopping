import { searchList, searchInput } from "./util/querySelector.js";

export class Autocompletekeyword {
  constructor() {
    this.bounce = null;
    this.getDebounce();
  }

  getDebounce() {
    let _this = this;
    searchInput.addEventListener("input", function (event) {
      const key = event.target.value;
      if (this.bounce) clearTimeout(this.bounce);
      this.bounce = setTimeout(function () {
        _this.getAmazonAPI(key);
      }, 500);
    });
  }
}
