import { $, $$, removeClass, addClass } from "../js/utils/utils.js";
import { View } from "../View/autoCompltView.js";
import { Model } from "../Model/autoCompltData.js";
class Controller {
  _target;
  _model;
  _view;

  constructor(target, model, view) {
    this._target = target;
    this._model = model;
    this._view = view;
    this.latestSearchContents = $(".latest-search-contents");
    this.historyBtns = $(".history-btns");
  }

  setData(inputValue) {
    return this._model.getData(inputValue);
  }

  render(data) {
    this._view.render(data);
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    this._target.addEventListener("input", this.autoCompltEvtHandler);
  }

  autoCompltEvtHandler = (e) => {
    if (!$(".coupang-search").value) {
      removeClass(this.latestSearchContents, this.historyBtns, "down");
      this.render("");
    } else {
      addClass(this.latestSearchContents, this.historyBtns, "down");
      this.delayFetch(this.setData($(".coupang-search").value));
    }
  };

  delayFetch(filteredData) {
    new Promise((resolve) =>
      setTimeout(() => {
        const searchedDB = filteredData;
        resolve(filteredData);
      }, 500)
    ).then((data) => {
      if ($(".coupang-search").value) {
        this.render(data.sort((a, b) => b.views - a.views));
      }
    });
  }
}
export { Controller };
