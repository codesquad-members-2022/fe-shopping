import * as domutil from "../../../util/domutil.js";

class HeaderKeyboadManager {
  constructor(observer) {
    this.observer = observer;
    this.arrowCount = -1;
  }

  getIdxCount(key, length, count) {
    if (key === "ArrowUp") {
      count++;
    }

    if (key === "ArrowDown") {
      count++;
    }

    if (count < 0) {
      count = length;
      return count;
    }

    if (count > length) {
      count = 0;
      return count;
    }
  }

  searchInputArrow(key) {
    const list = domutil.$All(".search--toggle--li");
    const { prev, current } = this.changeKeyCount(key, list);
    this.searchInputView.hilight({ prev, current, list });
  }

  changeKeyCount(key, list) {
    const targetLength = list.length - 1;
    let count = this.arrowCount;
    let prev = count;

    if (key === "ArrowUP") {
      count--;
    } else if (key === "ArrowDown") {
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
