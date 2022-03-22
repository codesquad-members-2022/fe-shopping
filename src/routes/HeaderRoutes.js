import * as fetchUtil from "../util/fetchutil.js";

class HeaderRoutes {
  constructor(dataDispatcher) {
    this.dataDispatcher = dataDispatcher;
  }

  async setAutoCompleteData(uri) {
    const data = await fetchUtil.fetchData(uri); // 에러나면 await이랑 async 삭제해볼것 : fetchData 도 async함수임
    console.log(data);

    if (this.isEmptyData(data)) {
      return;
    }

    this.dataDispatcher.searchInputData = data; // setter 호출
  }

  async getMenuData(uri) {
    const data = await fetchUtil.fetchData(uri);

    this.dataDispatcher.searchMenuData = data;
  }

  isEmptyData(data) {
    if (!Array.isArray(data) || data.length <= 0) {
      return true;
    }
  }
}

export { HeaderRoutes };
