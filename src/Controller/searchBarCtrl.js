import { AutoCpltController } from "./autoCompltContrl.js";
import { AutoCpltView } from "../View/autoCompltView.js";
import { AutoCpltModel } from "../Model/autoCompltData.js";

class SearchBar {
  constructor() {}

  init() {
    const search_bar = new AutoCpltController(document.querySelector(".coupang-search"), new AutoCpltModel(), new AutoCpltView());
    search_bar.init();
  }
}

export { SearchBar };
