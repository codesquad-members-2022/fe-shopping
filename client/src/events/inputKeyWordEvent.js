import { $ } from '../utils/util.js';
import { SearchKeyWord } from '../components/search/SearchKeyWord.js';
import { keywords } from '../constants/data.js';

export const inputKeyWordEvent = () => {
  const inputKeyWordBox = $('.main-header__bottom-search-input');

  inputKeyWordBox.addEventListener('keyup', ({ target }) => {
    const keyword = target.value;
    // fetch api
    // fetch 보내기전 임의로 클라이언트에서 더미데이터로 테스팅
    const searchKeyWordBox = $('.main-header__bottom-search-keyword');
    if (!searchKeyWordBox) {
      inputKeyWordBox.insertAdjacentHTML('afterend', SearchKeyWord(keywords['Ahkeyword']));
    }
  });

  inputKeyWordBox.addEventListener('focus', ({ target }) => {
    // 최근검색어가 있으면 최근검색어 컴포넌트 보여주기
    // 최근검색어가 없으면 리턴.
  });
};
