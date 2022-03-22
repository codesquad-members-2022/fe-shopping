import { $, removeClass, addClass, addEvent } from "../../utils/utils.js";
class RenderHistoryBar {
  constructor() {
    this.inputElement = $(".latest-search");
  }

  render() {
    addEvent(document, "click", this.eventHandler);
  }

  eventHandler = (e) => {
    if (e.target === $(".coupang-search")) {
      removeClass(this.inputElement, "down");
    } else if (e.target.closest(".latest-search")) {
      //부모요소에 latest Search가 있으면 리턴
      return;
    } else {
      addClass(this.inputElement, "down");
    }
  };

  init() {
    this.render();
  }
}

export { RenderHistoryBar };
