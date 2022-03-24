import * as fetchUtil from "../util/fetchutil.js";

class HeaderRoutes {
  constructor(inputObserver, menuObserver) {
    this.inputObserver = inputObserver;
    this.menuObserver = menuObserver;
  }

  async getAutoCompleteData(uri) {
    const data = await fetchUtil.fetchData(uri);

    if (this.isEmptyData(data)) {
      return;
    }

    return data;
  }

  async getMenuData(uri) {
    const data = await fetchUtil.fetchData(uri);
    return data;
  }

  isEmptyData(data) {
    if (data.length <= 0) {
      return true;
    }
  }
}

export { HeaderRoutes };
