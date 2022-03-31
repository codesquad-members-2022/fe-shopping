import * as fetchUtil from "../../util/fetchutil.js";

class FetchDataManager {
  constructor() {}

  async getFetchData(uri) {
    const fetchedData = fetchUtil.fetchData(uri);
    return fetchedData;
  }
}

export { FetchDataManager };
