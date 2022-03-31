import { fetchData } from "../../util/fetchutil.js";
import * as domUtil from "../../util/domutil.js";

class SearchMenuEventHandler {
  constructor(store, observer) {
    this.store = store;
    this.menuObserver = observer;
  }
  init() {
    this.store.menuView.getMenuData = this.getMenuData.bind(this);
    this.store.menuView.removeMenu = this.removeMenu.bind(this);
    this.store.menuView.init();
  }

  async getMenuData() {
    const uri = "search/menu/toggle";
    const fetchedData = await fetchData(uri);

    this.menuObserver.notify("incomeMenuData", fetchedData);
  }

  removeMenu({ target }) {
    // const hasNoEventDom = domUtil.$("body");
    // if (target !== hasNoEventDom) {
    //   this.store.menuView.removePrevView(
    //     this.store.menuView.staticData.parentDom,
    //     removeTarget
    //   );
    // }
  }
}

export { SearchMenuEventHandler };
