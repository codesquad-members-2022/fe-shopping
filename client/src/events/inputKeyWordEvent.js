import { $, fetchPostData } from '../utils/util.js';
import SearchWord from '../classes/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__input');
  const inputKeyWordBtn = $('.main-header__input--btn');
  let keyWordTimer;
  let saveValue = '';

  inputKeyWordBox.addEventListener('keyup', ({ target }) => {
    if (searchWord.getTurn()) {
      searchWord.turnOff();
    }

    if (keyWordTimer) {
      clearTimeout(keyWordTimer);
    }
    keyWordTimer = setTimeout(async function () {
      // fetch api
      // fetch 보내기전 임의로 클라이언트에서 더미데이터로 테스팅
      if (target.value) {
        // fetch!
        const responseData = await fetchPostData('search', target.value);
        searchWord.toggleRender(responseData);
        saveValue = target.value;
      } else {
        // target.value가 비어있을때 처리
        const recentSearchBox = $('.search-recent');
        const searchKeywordBox = $('.main-header__search-keyword');
        searchKeywordBox?.remove();

        if (searchWord.recentWords.length !== 0) {
          searchWord.turnOn();
          searchWord.toggleRender();
        } else recentSearchBox?.remove();
      }
    }, 500);
  });

  inputKeyWordBox.addEventListener('focus', () => {
    searchWord.turnOn();
    searchWord.toggleRender();
  });

  inputKeyWordBtn.addEventListener('click', () => {
    if (saveValue) {
      searchWord.recentWords.push(saveValue);
      saveValue = '';
    }
  });
};
