import storage from "../util/storage.js";
import { isEmpty, sortDesc } from "../util/util.js";

export default class {
  constructor(dataSizeLimit) {
    this.dataSizeLimit = dataSizeLimit;
    this.firstIdx = 0;
  }

  setStoredDatasIdx(key, val) {
    const storedDatas = storage.getLocalStorage(key)
      ? storage.getLocalStorage(key)
      : [];

    if (isEmpty(storedDatas)) {
      return storedDatas;
    }

    let idxChangedDatas = storedDatas.reduce((prev, cur) => {
      if (cur["input"] === val) {
        return prev;
      }
      const { no, input } = cur;
      return [...prev, { no: no + 1, input }];
    }, []);

    return idxChangedDatas;
  }

  removeLeastUsedData(curData, key, newDataSize) {
    const requiredSize = this.dataSizeLimit - newDataSize;
    if (curData.length > requiredSize) {
      return sortDesc(curData, key).slice(newDataSize);
    }
    return curData;
  }

  storeItem(key, val) {
    const curInputData = { no: this.firstIdx, input: val };
    const curInputDataCnt = curInputData.length;

    let storedDatas = this.setStoredDatasIdx(key, val);
    const sortByKey = "no";
    storedDatas = this.removeLeastUsedData(
      storedDatas,
      sortByKey,
      curInputDataCnt
    );

    storage.setLocalStorage(key, [...storedDatas, curInputData]);
    // 여기서 뷰를 호출? 모델뷰?
    this.recentSearchView.recentSearchData = storage.getLocalStorage(key);
  }
}
