export class AutoCompleteStore {
  constructor() {
    this.keywordData = [];
    this.maxLiNum = 10;
  }
  async getKeywordData(value) {
    const data = await fetch("./data/fakeDB.json");
    const json = await data.json();
    let sorted = await json.products
      .filter((v) => v.keyword.includes(value))
      .sort((a, b) => b.views - a.views);
    if (sorted.length > this.maxLiNum) {
      sorted = sorted.splice(0, this.maxLiNum);
    }
    this.keywordData = sorted.map((v) => v.keyword);
  }
}
