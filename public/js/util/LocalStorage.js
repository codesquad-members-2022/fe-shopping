import storage from "./storage.js";
import { isEmpty } from "./util.js";

export default class {
  constructor({ dataSizeLimit, options }) {
    this.dataSizeLimit = dataSizeLimit;
    this.options = options;
    this.firstIdx = 0;
  }

  filterData(data, item) {
    return data.filter((el) => el[this.options.dataName] !== item);
  }

  increaseDataNo(data) {
    if (!data) {
      return [];
    }
    const numName = "no";
    const dataName = this.options.dataName;

    return data.map((el) => {
      return {
        [numName]: el[numName] + 1,
        [dataName]: el[dataName],
      };
    });
  }

  getFilteredData(key, item) {
    const storedDatas = storage.getLocalStorage(key)
      ? storage.getLocalStorage(key)
      : [];
    if (isEmpty(storedDatas)) {
      return [];
    }

    const filteredData = this.filterData(storedDatas, item);
    return this.increaseDataNo(filteredData);
  }

  _sortDataDesc(data1, data2) {
    return data2.no - data1.no;
  }

  removeLeastUsedData(curData, key, newDataSize) {
    const requiredSize = this.dataSizeLimit - newDataSize;
    if (curData.length > requiredSize) {
      return curData.sort(this._sortDataDesc).slice(newDataSize);
    }
    return curData;
  }

  storeItem(key, val) {
    const curInputData = {
      no: this.firstIdx,
      [this.options.dataName]: val,
    };

    let storedDatas = this.getFilteredData(key, val);
    if (isEmpty(storedDatas)) {
      storage.setLocalStorage(key, [curInputData]);
      return;
    }

    const sortByKey = this.numName;
    const curInputDataCnt = [curInputData].length;
    const dataRemovedLeastUsed = this.removeLeastUsedData(
      storedDatas,
      sortByKey,
      curInputDataCnt
    );

    storage.setLocalStorage(key, [...dataRemovedLeastUsed, curInputData]);
  }
}
