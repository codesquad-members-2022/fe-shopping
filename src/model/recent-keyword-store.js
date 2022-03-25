export class RecentKeywordStore {
  constructor() {
    this.setLocalStorageArr();
    this.maxListNum = 8;
  }

  setLocalStorageArr() {
    this.localStorageArr = [];
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(localStorage.key(i));
    }
    storage
      .sort((a, b) => b - a)
      .forEach((key) => this.localStorageArr.push(localStorage.getItem(key)));

    if (this.localStorageArr.length > this.maxListNum) {
      this.localStorageArr = this.localStorageArr.splice(0, this.maxListNum);
    }
  }
}
