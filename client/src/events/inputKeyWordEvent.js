import { $ } from '../utils/util.js';
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
    keyWordTimer = setTimeout(function () {
      // fetch api
      // fetch 보내기전 임의로 클라이언트에서 더미데이터로 테스팅
      if (target.value) {
        searchWord.toggleRender();
        saveValue = target.value;
      }

      // target.value가 비어있을때 처리
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
