import { $ } from '../../utils/util.js';
import { RecentSearch } from '../../components/search/RecentSearch.js';

export class SearchWord {
  static recentWords = [];
  turn;
  constructor() {
    this.turn = true;
  }

  removeAll() {}

  turnOff() {
    this.turn = false;
  }
}

SearchWord.prototype.render = () => {
  // 최근검색어가 없으면 리턴.
  // 최근검색어가 있으면 최근검색어 컴포넌트 보여주기
  if (SearchWord.recentWords.length === 0) return;
  const inputKeyWordBox = $('.main-header__input');
  const recentSearchBox = $('.search-recent');
  recentSearchBox?.remove();
  inputKeyWordBox.insertAdjacentHTML('afterend', RecentSearch(SearchWord.recentWords));
};
