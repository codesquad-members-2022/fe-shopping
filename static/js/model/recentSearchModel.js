export class RecentSearchModel {
  constructor(sessionStorage) {
    this.storage = sessionStorage;
    this.keywordList = [];
  }

  setState() {
    if (this.isEmpty) {
      this.storage.setItem('keyword', []);
      return;
    }
    this.keywordList = JSON.parse(this.storage['keyword']);
  }

  isEmpty() {
    return !!(this.storage['keyword']);
  }

  addKeyword(keyword) {
    const keywordListMaxLength = 9;
    if (this.keywordList.includes(keyword)) {
      return;
    }
    if (this.keywordList.length >= keywordListMaxLength) {
      this.keywordList.shift();
    }
    this.keywordList.push(keyword);
    this.storage['keyword'] = JSON.stringify(this.keywordList);
  }

  deleteKeyword(keyword) {
    const keywordIndex = this.keywordList.indexOf(keyword);
    this.keywordList.splice(keywordIndex, 1);
    this.storage['keyword'] = JSON.stringify(this.keywordList);
  }
}
