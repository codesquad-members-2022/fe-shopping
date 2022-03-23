import { $, $$ } from "../js/utils/utils.js";
import { Model } from "./model.js";
class AutoCpltModel extends Model {
  constructor() {
    super();
    this.apiURL = "http://localhost:3000/items";
    this.userInput = $(".coupang-search").value;
  }

  async getData(ipnutValue) {
    return fetch(`${this.apiURL}?input=${ipnutValue}`).then((res) => res.json());
  }
}

export { AutoCpltModel };
