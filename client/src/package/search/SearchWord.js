import { $ } from '../../utils/util.js';
import { RecentSearch } from '../../components/search/RecentSearch.js';
import { SearchKeyWord } from '../../components/search/SearchKeyWord.js';

export default function SearchWord() {
  this.recentWords = [];
  this.currentWord = '';
  this.turn = true;
  this.onRecent = true;
  this.position = -1;
}

SearchWord.prototype.pushRecentWords = function () {
  if (this.recentWords.includes(this.currentWord)) return;
  this.recentWords.push(this.currentWord);
};

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

SearchWord.prototype.setPosition = function (position) {
  this.position = position;
};

SearchWord.prototype.addPosition = function () {
  this.position++;
};

SearchWord.prototype.minusPosition = function () {
  this.position--;
};

SearchWord.prototype.removeAll = function () {
  this.recentWords = [];
};

SearchWord.prototype.offRecentComponent = function () {
  this.onRecent = false;
  this.toggleRender();
};

SearchWord.prototype.onRecentComponent = function () {
  this.onRecent = true;
  this.toggleRender();
};

SearchWord.prototype.addOnRecentBtnEventListener = function () {
  const onRecentButton = $('.search-recent--on');
  onRecentButton.addEventListener('click', () => {
    this.onRecentComponent();
  });
};

SearchWord.prototype.addOffRecentBtnEventListener = function () {
  const offRecentButton = $('.search-recent--off');
  offRecentButton.addEventListener('click', () => {
    this.offRecentComponent();
  });
};

SearchWord.prototype.addRemoveBtnEventListener = function () {
  const recentRemoveBtn = $('.search-recent--remove');
  recentRemoveBtn.addEventListener('click', ({ target }) => {
    this.removeAll();
    this.toggleRender();
  });
};

SearchWord.prototype.toggleRender = function (data) {
  // 최근검색어가 없으면 리턴.
  // turn 값이 true라면 최근검색어가 최근검색어 컴포넌트 보여주기
  // turn 값이 false라면 자동완성된 결과 컴포넌트 보여주기
  const inputKeyWordBox = $('.main-header__input');
  const recentSearchBox = $('.search-recent');
  const searchKeywordBox = $('.search-keyword');

  recentSearchBox?.remove();
  searchKeywordBox?.remove();

  if (this.getTurn()) {
    if (this.recentWords.length === 0) return;
    inputKeyWordBox.insertAdjacentHTML('afterend', RecentSearch(this.recentWords, this.onRecent));
    this.addRemoveBtnEventListener();
    this.onRecent ? this.addOffRecentBtnEventListener() : this.addOnRecentBtnEventListener();
  } else {
    inputKeyWordBox.insertAdjacentHTML(
      'afterend',
      SearchKeyWord(
        this.getCurrentWord(),
        data.map(element => element.keyword)
      )
    );
  }
};
