export class RecentSearchModel {
  constructor(localStorage) {
    this.storage = localStorage;
    this.keywordIndexList = [];
    this.keywordList = [];
  }

  isEmpty() {
    return this.storage.length === 0;
  }

  addKeyword(keyword) {
    const keywordListMaxLength = 9;
    if (this.keywordList.includes(keyword)) {
      return;
    }
    if (this.keywordList.length >= keywordListMaxLength) {
      const oldestKeywordIndex = this.keywordIndexList[0];
      this.storage.removeItem(oldestKeywordIndex);
      this.keywordList.splice(0, 1);
    }
    const keywordIndex = Date.now();
    this.storage.setItem(keywordIndex, keyword);
    this.keywordIndexList.push(keywordIndex);
    this.keywordList.push(keyword);
  }

  updateKeywordList() {
    const localStorageKeys = Object.keys(this.storage)
      .filter((storageKey) => Number(storageKey))
      .sort();
    const keywordList = localStorageKeys.map((storageKey) => this.storage[storageKey]);
    this.keywordIndexList = localStorageKeys;
    this.keywordList = keywordList;
  }

  deleteKeyword(selectedKeywordIndex) {
    this.keywordIndexList = this.keywordIndexList.filter((keywordIndex) => keywordIndex !== selectedKeywordIndex);
    this.keywordList = this.keywordList.filter((keyword) => keyword !== this.storage[selectedKeywordIndex]);
    this.storage.removeItem(selectedKeywordIndex);
  }
}
