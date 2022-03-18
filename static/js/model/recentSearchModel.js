export class RecentSearchModel {
  constructor(localStorage) {
    this.storage = localStorage;
    this.keywordList = [];
  }

  isEmpty() {
    return this.storage.length === 0;
  }

  addKeyword(keyword) {
    const keywordList = Object.values(this.storage);
    if (keywordList.includes(keyword)) {
      return;
    }
    this.storage.setItem(Date.now(), keyword);
    this.keywordList.push(keyword);
  }

  createKeywordList() {
    const localStorageIndice = Object.keys(this.storage);
    let keywordList = localStorageIndice.map((storageIndex) => {
      return this.storage[storageIndex];
    });
    this.keywordList = keywordList;
  }
}