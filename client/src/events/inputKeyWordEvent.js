import { $ } from '../utils/util.js';
import { SearchWord } from '../classes/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__bottom-search-input');
  const inputKeyWordBtn = $('.main-header__bottom-search--btn');
  let keyWordTimer;
  let saveValue = '';

  inputKeyWordBox.addEventListener('keyup', ({ target }) => {
    if (keyWordTimer) {
      clearTimeout(keyWordTimer);
    }
    keyWordTimer = setTimeout(function () {
      // fetch api
      // fetch 보내기전 임의로 클라이언트에서 더미데이터로 테스팅
      const searchKeyWordBox = $('.main-header__bottom-search-keyword');
      if (target.value) {
        // inputKeyWordBox.insertAdjacentHTML('afterend', SearchKeyWord(keywords['Ahkeyword']));
        saveValue = target.value;
      }
    }, 500);
  });

  inputKeyWordBox.addEventListener('focus', () => {
    if (searchWord.turn) {
      searchWord.render();
    }
  });

  inputKeyWordBtn.addEventListener('click', () => {
    console.log('search Icon');
    if (saveValue) {
      SearchWord.recentWords.push(saveValue);
      saveValue = '';
    }
  });
};
