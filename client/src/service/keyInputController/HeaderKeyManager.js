import * as domutil from "../../util/domutil.js";

class HeaderKeyboadManager {
  constructor(searchInputView, searchMenuView) {
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
    this.arrowCount = -1;
  }

  searchInputArrow(keyCode) {
    const list = domutil.$All(".search--toggle--li");
    const { prev, current } = this.changeKeyCount(keyCode, list);
    this.searchInputView.hilight({ prev, current, list });
  }

  changeKeyCount(keyCode, list) {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const targetLength = list.length - 1;
    let count = this.arrowCount;
    let prev = count;

    if (keyCode === KEY_UP) {
      count--;
    } else if (keyCode === KEY_DOWN) {
      count++;
    }

    if (count < 0) {
      count = targetLength;
    } else if (count > targetLength) {
      count = 0;
    }

    // default값이 -1이기때문에
    if (prev < 0) {
      prev = 0;
    }
    const current = count;
    this.arrowCount = count;
    return { prev, current };
  }

  initCount() {
    this.arrowCount = -1;
  }
}

export { HeaderKeyboadManager };
