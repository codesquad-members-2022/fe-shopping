export class CurrentSearchStore {
  constructor() {
    this.localStorageArr = [];
  }

  getLocalStorage() {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      arr.push(localStorage.key(i));
    }
    arr
      .sort((a, b) => b - a)
      .forEach((v) => this.localStorageArr.push(localStorage.getItem(v)));
  }
}
