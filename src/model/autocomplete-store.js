export class AutoCompleteStore {
  constructor() {
    this.keywordData = [];
    this.maxListNum = 10;
    this.apiURL = "http://127.0.0.1:3000/autocomplete";
  }
  async setKeywordArr(input) {
    const data = await fetch(`${this.apiURL}?keyword=${input}`);
    const result = await data.json();

    this.keywordData = result;
  }
}
