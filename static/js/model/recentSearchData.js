export class RecentSearchData {
  constructor(localStorage) {
    this.dataCount = 0;
    this.storage = localStorage;
    this.keywordList = [];
  }

  isEmpty() {
    const isEmpty = this.storage.length === 0 ? true : false;
    return isEmpty;
  }

  addKeyword(keyword) {
    if (this.storage.getItem(keyword)) {
      return;
    }
    this.storage.setItem(keyword, this.dataCount);
    this.keywordList.push(keyword);
    this.dataCount++;
  }

  createKeywordList() {
    const localStorageIndice = Object.values(this.storage).sort();
    const localStorageKeywords = Object.keys(this.storage);
    let keywordList = localStorageIndice.map((storageIndex) => {
      const storageKeyword = localStorageKeywords.find((keyword) => this.storage[keyword] === storageIndex);
      return storageKeyword;
    });
    this.keywordList = keywordList;
  }
}