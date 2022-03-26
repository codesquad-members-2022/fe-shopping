export class RelativeSearchModel {
  constructor() {
    this.data = [];
    this.keywordList = [];
  }

  isEmpty() {
    return this.keywordList.length === 0;
  }

  updateKeywordList(searchKeyword) {
    const keywordList = this.data.filter(({keyword}) => keyword.includes(searchKeyword));
    this.keywordList = keywordList;
    return keywordList;
  }

  setData(data) {
    this.data = data;
  }
}
