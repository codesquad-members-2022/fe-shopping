export class AutoCompleteStore {
  constructor() {
    this.maxListNum = 10;
  }
  async setKeywordArr(value) {
    const data = await fetch("./data/fakeDB.json");
    const json = await data.json();
    let sorted = await json.products
      .filter((v) => v.keyword.includes(value))
      .sort((a, b) => b.views - a.views);
    if (sorted.length > this.maxListNum) {
      sorted = sorted.splice(0, this.maxListNum);
    }
    this.keywordData = sorted.map((v) => v.keyword);
  }
}
