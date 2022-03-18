export class LocalStorage {
  constructor() {
    this.localStorage = localStorage;
    this.keywordListName = 'RECENT_SEARCH_KEYWORD';
    this.keywordList = JSON.parse(localStorage.getItem(this.keywordListName)) || [];
  }

  saveKeywordList() {
    this.localStorage.setItem(this.keywordListName, JSON.stringify(this.keywordList));
  }

  addKeywordList(keyword) {
    const MAX_ITEMS = 9;
    if (this.keywordList.length === MAX_ITEMS) {
      this.keywordList.pop();
    }

    this.keywordList.unshift(keyword);
    this.keywordList = Array.from(new Set(this.keywordList));
    this.saveKeywordList();
  }

  removeKeywordList(e) {
    this.keywordList = this.keywordList.filter(
      (item) => item !== e.target.previousElementSibling.innerText
    );
    this.saveKeywordList();
  }

  clearKeywordList() {
    this.keywordList = [];
    this.saveKeywordList();
  }
}
