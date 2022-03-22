export class AutoCompleteStore {
  constructor() {
    this.keywordData = [];
  }
  async getKeywordData(value) {
    const data = await fetch("./data/fakeDB.json");
    const json = await data.json();
    const sorted = await json.products
      .filter((v) => v.keyword.includes(value))
      .sort((a, b) => b.views - a.views);

    this.keywordData = sorted.map((v) => v.keyword);
  }
}
