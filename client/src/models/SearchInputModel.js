export class SearchInputModel {
  constructor() {
    this.recentWords = [];
    this.resultViewData = [];
    this.currentWord = '';
    this.position = -1;
    this.turn = true;
    this.onRecent = true;
  }

  getRecentWords() {
    return this.recentWords;
  }

  pushRecentWords() {
    if (this.recentWords.includes(this.currentWord)) return;
    this.recentWords.push(this.currentWord);
  }

  getResultViewData() {
    return this.resultViewData;
  }

  setResultViewData(resultViewData) {
    this.resultViewData = resultViewData;
  }

  getCurrentWord() {
    return this.currentWord;
  }

  setCurrentWord(currentWord) {
    this.currentWord = currentWord;
  }

  setPosition(position) {
    this.position = position;
  }

  addPosition() {
    this.position++;
  }

  minusPosition() {
    this.position--;
  }

  removeRecentWords() {
    this.recentWords = [];
  }

  turnOff() {
    this.turn = false;
  }

  turnOn() {
    this.turn = true;
  }

  getTurn() {
    return this.turn;
  }
}
