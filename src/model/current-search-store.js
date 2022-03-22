export class CurrentSearchStore {
  constructor() {
    this.localStorageArr = [];
    this.getLocalStorage();
  }

  getLocalStorage() {
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(localStorage.key(i));
    }
    storage
      .sort((a, b) => b - a)
      .forEach((v) => this.localStorageArr.push(localStorage.getItem(v)));
  }
}
