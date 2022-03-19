export class KeywordLocalStorage {
  constructor() {
    this.storage = localStorage;
    this.keywordList = JSON.parse(this.storage.getItem(KeywordLocalStorage.keywordName)) || [];
  }

  static keywordName = 'RECENT_SEARCH_KEYWORD';

  saveKeywordList() {
    this.storage.setItem(KeywordLocalStorage.keywordName, JSON.stringify(this.keywordList));
  }

  addKeywordList(keyword) {
    const MAX_ITEMS = 9;
    if (this.keywordList.length === MAX_ITEMS || this.keywordList.includes(keyword)) {
      this.keywordList.pop();
    }

    this.keywordList.unshift(keyword);
    this.saveKeywordList();
  }

  removeKeywordList(keyword) {
    this.keywordList = this.keywordList.filter((item) => item !== keyword);
    this.saveKeywordList();
  }

  clearKeywordList() {
    this.keywordList = [];
    this.saveKeywordList();
  }
}
