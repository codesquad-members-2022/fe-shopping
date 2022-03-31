import { fetchData } from '../../utility/util.js';

export default class Model {
  constructor() {
    this.recentWordStore = [];
    this.completeData = null;
  }

  async getCompleteData(consonant) {
    const jsonData = await fetchData('/completeData');
    const completeData = jsonData[`${consonant}data`];
    return completeData;
  }

  getRecentWord() {
    return this.recentWordStore;
  }

  addRecentWord(inputValue) {
    this.recentWordStore.push(inputValue);
    return this.getRecentWord();
  }

  deleteRecentWord() {}

  resetRecentWord() {
    this.recentWordStore = [];
    return this.getRecentWord();
  }
}
