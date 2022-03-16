import { $ } from '../../utils/util.js';
import { RecentSearch } from '../../components/search/RecentSearch.js';
import { SearchKeyWord } from '../../components/search/SearchKeyWord.js';

export default function SearchWord() {
  this.recentWords = [];
  this.currentWord = '';
  this.turn = true;
}

SearchWord.prototype.getCurrentWord = function () {
  return this.currentWord;
};

SearchWord.prototype.setCurrentWord = function (currentWord) {
  this.currentWord = currentWord;
};

SearchWord.prototype.turnOff = function () {
  this.turn = false;
};

SearchWord.prototype.turnOn = function () {
  this.turn = true;
};

SearchWord.prototype.getTurn = function () {
  return this.turn;
};

SearchWord.prototype.removeAll = function () {
  this.recentWords = [];
};

SearchWord.prototype.toggleRender = function (data) {
  // 최근검색어가 없으면 리턴.
  // turn 값이 true라면 최근검색어가 최근검색어 컴포넌트 보여주기
  // turn 값이 false라면 자동완성된 결과 컴포넌트 보여주기
  const inputKeyWordBox = $('.main-header__input');
  const recentSearchBox = $('.search-recent');
  const searchKeywordBox = $('.main-header__search-keyword');

  recentSearchBox?.remove();
  searchKeywordBox?.remove();

  if (this.getTurn()) {
    if (this.recentWords.length === 0) return;
    inputKeyWordBox.insertAdjacentHTML('afterend', RecentSearch(this.recentWords));
  } else {
    inputKeyWordBox.insertAdjacentHTML('afterend', SearchKeyWord(this.getCurrentWord(), data));
  }
};
