import * as domutil from "../../util/domutil.js";

class HeaderKeyboadManager {
  constructor(searchInputView, searchMenuView) {
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
    this.arrowCount = {
      count: -1,
      autoComplete: null,
    };
  }

  searchInputArrow(keyCode) {
    const list = domutil.$All(".search--toggle--li");
    const { prev, current } = this.changeKeyCount(keyCode, list);
    console.log(list, prev, current);
    this.searchInputView.hilight({ prev, current, list });
  }

  changeKeyCount(keyCode, list) {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const targetLength = list.length - 1;
    let { count } = this.arrowCount;
    const prev = count;

    if (keyCode === KEY_UP) {
      count--;
    } else if (keyCode === KEY_DOWN) {
      count++;
    }

    if (count < 0) {
      count = targetLength;
    } else if (count >= targetLength) {
      count = 0;
    }

    const current = count;
    this.arrowCount.count = count;
    return { prev, current };
  }
}

export { HeaderKeyboadManager };
