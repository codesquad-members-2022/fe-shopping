import storage from "../util/storage.js";
import option from "../common/option.js";
import { isEmpty, sortDesc } from "../util/util.js";

export default class {
  constructor({ dataSizeLimit }) {
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
      if (cur[option.recentSearchValueName] === val) {
        return prev;
      }

      const curData = {
        no: cur["no"] + 1,
        [option.recentSearchValueName]: cur[option.recentSearchValueName],
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
      [option.recentSearchValueName]: val,
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
