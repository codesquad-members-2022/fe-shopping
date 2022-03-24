import { $, $$, removeClass, addClass } from "../js/utils/utils.js";
import { AutoCpltView } from "../View/autoCompltView.js";
import { AutoCpltModel } from "../Model/autoCompltData.js";
import { Controller } from "./controller.js";
class AutoCpltController extends Controller {
  constructor(target, model, view) {
    super(target, model, view);
    this.latestSearchContents = $(".latest-search-contents");
    this.historyBtns = $(".history-btns");
  }

  EvtHandler = (e) => {
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
export { AutoCpltController };
