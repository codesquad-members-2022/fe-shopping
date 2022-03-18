export class RelativeSearchModel {
  constructor(data) {
    this.data = data;
    this.keywordList = [];
  }

  createKeywordList(searchKeyword) {
    const keywordList = this.data.reduce((keywordList, data) => {
      const keyword = data.keyword;
      if (keyword.includes(searchKeyword)) {
        keywordList.push(keyword);
      }
      return keywordList;
    }, []);
    return keywordList;
  }
}
