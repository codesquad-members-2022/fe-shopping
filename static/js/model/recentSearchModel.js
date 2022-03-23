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
    const keywordListMaxLength = 9;
    if (keywordList.includes(keyword)) {
      return;
    }
    if (keywordList.length >= keywordListMaxLength) {
      const oldKeyword = keywordList[0];
      this.keywordList.splice(0, 1);
      this.storage.removeItem(oldKeyword);
    }
    this.storage.setItem(Date.now(), keyword);
    this.keywordList.push(keyword);
  }

  updateKeywordList() {
    const localStorageIndice = Object.keys(this.storage).sort();
    const keywordList = localStorageIndice
    .filter((storageIndex) => Number(storageIndex))
    .map((storageIndex) => this.storage[storageIndex]);
    console.log(keywordList);
    this.keywordList = keywordList;
  }
}