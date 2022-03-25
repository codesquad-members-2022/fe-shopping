export default class SearchModel {
  constructor({
    history = [],
    mode = { history: true, autoComplete: true },
    categories = [],
    currentCategory = categories[0],
  }) {
    this.historyMode = mode.history;
    this.autoCompleteMode = mode.autoComplete;
    this.categories = categories;
    this.currentCategory = currentCategory;
    this.history = history;
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

  getHistory() {
    return this.history;
  }

  setHistory(inputValue) {
    const isDuplicated = this.history.find((value) => value === inputValue);
    if (isDuplicated) return;

    const maxLength = 9;
    if (this.history.length >= maxLength) this.history.shift();

    this.history.push(inputValue);
  }

  clearHistory() {
    this.history = [];
  }
}
