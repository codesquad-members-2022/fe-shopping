import { Controller } from "./autoCompltContrl.js";
import { View } from "../View/autoCompltView.js";
import { Model } from "../Model/autoCompltData.js";

class SearchBar {
  // _model;
  // _view;
  // _controller;
  constructor() {
    //   this._controller = controller;
    //   this._model = model;
    //   this._view = view;
  }

  init() {
    const search_bar = new Controller(document.querySelector(".coupang-search"), new Model(), new View());
    search_bar.init();
  }
}

export { SearchBar };
