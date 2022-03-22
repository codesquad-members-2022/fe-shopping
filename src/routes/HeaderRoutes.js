import * as fetchUtil from "../util/fetchutil.js";

class HeaderRoutes {
  constructor(dataDispatcher) {
    this.dataDispatcher = dataDispatcher;
  }

  async getData(uri) {
    const data = fetchUtil.fetchData(uri);
    this.dataDispatcher.disposeData(data);
  }
}

export default HeaderRoutes;
