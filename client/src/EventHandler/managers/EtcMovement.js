import * as domUtil from "../../util/domutil.js";

class ETCmovement {
  constructor(searchInputView, searchMenuView) {
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
  }

  removeMenu({ target }) {
    const hasNoEventDom = domUtil.$("body");
    if (target !== hasNoEventDom) {
      this.searchMenuView.removePrevView(
        this.searchMenuView.parentDom,
        removeTarget
      );
    }
  }
}

export { ETCmovement };
