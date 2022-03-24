import * as domUtil from "../../util/domutil.js";

class ETCmovement {
  constructor(searchInputView, searchMenuView) {
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
  }

  removeMenu({ target }) {
    const hasNoEventDom = domUtil.$("body");
    // 클릭한 타겟에 등록한 이벤트가 있는지 getEventListners 메서드를 사용해보았는데 개발자도구에서만 가능한 메서드라 하여 진행을위해 하드코딩
    if (target !== hasNoEventDom) {
      this.searchMenuView.removePrevView(
        this.searchMenuView.parentDom,
        removeTarget
      );
    }
  }
}

export { ETCmovement };
