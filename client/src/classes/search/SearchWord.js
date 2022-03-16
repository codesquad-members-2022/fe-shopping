import { $ } from '../../utils/util.js';
import { RecentSearch } from '../../components/search/RecentSearch.js';
import { SearchKeyWord } from '../../components/search/SearchKeyWord.js';
import { keywordsData } from '../../constants/data.js';

export default function SearchWord() {
  this.recentWords = [];
  this.turn = true;

  this.removeAll = () => {
    this.recentWords = [];
  };

  this.turnOff = () => {
    this.turn = false;
  };

  this.turnOn = () => {
    this.turn = true;
  };

  this.getTurn = () => {
    return this.turn;
  };
}

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
    inputKeyWordBox.insertAdjacentHTML('afterend', SearchKeyWord(data));
  }
};
