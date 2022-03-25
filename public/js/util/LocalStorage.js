import storage from "./storage.js";
import { isEmpty, sortDesc } from "./util.js";

export default class {
  constructor({ dataSizeLimit, options }) {
    this.dataSizeLimit = dataSizeLimit;
    this.options = options;
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
      if (cur[options.recentSearchValueName] === val) {
        return prev;
      }

      const curData = {
        no: cur["no"] + 1,
        [options.recentSearchValueName]: cur[options.recentSearchValueName],
      };
      return [...prev, curData];
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
    const curInputData = {
      no: this.firstIdx,
      [options.recentSearchValueName]: val,
    };
    const curInputDataCnt = [curInputData].length;

    let storedDatas = this.setStoredDatasIdx(key, val);
    const sortByKey = "no";
    storedDatas = this.removeLeastUsedData(
      storedDatas,
      sortByKey,
      curInputDataCnt
    );

    storage.setLocalStorage(key, [...storedDatas, curInputData]);
  }
}
