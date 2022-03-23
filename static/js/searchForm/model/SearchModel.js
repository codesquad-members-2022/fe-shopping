export default class SearchModel {
  constructor({
    mode = { history: true, autoComplete: true },
    categories = [],
    currentCategory = '전체',
    inputValue = '',
  }) {
    this.inputValue = inputValue;
    this.historyMode = mode.history;
    this.autoCompleteMode = mode.autoComplete;
    this.categories = categories;
    this.currentCategory = currentCategory;
    this.history = [];
    this.autoCompleteWords = [];
  }

  getCategories() {
    return this.categories;
  }

  getCurrentCategory() {
    return this.currentCategory;
  }

  setCurrentCategory(category) {
    this.currentCategory = category;
  }
}
