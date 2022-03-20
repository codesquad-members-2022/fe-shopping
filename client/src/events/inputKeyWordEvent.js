import { $, $$, fetchPostData, delay } from '../utils/util.js';
import { KEY_ARROW_UP, KEY_ARROW_DOWN } from '../constants/constant.js';
import SearchWord from '../package/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__input');
  const inputKeyWordBtn = $('.main-header__input--btn');

  const toggleElementClassByKeyEvent = (element, className) => {
    element.forEach(element => {
      parseInt(element.getAttribute('data-id')) === searchWord.position
        ? element.classList.remove(className)
        : element.classList.add(className);
    });
  };

  const keyupEvent = () => {
    const searchLinks = $$('.search--link');
    searchWord.minusPosition();
    if (searchWord.position < 0) searchWord.setPosition(searchLinks.length - 1);
    toggleElementClassByKeyEvent(searchLinks, 'text-none');
  };

  const keydownEvent = () => {
    const searchLinks = $$('.search--link');
    searchWord.addPosition();
    if (searchWord.position >= searchLinks.length) searchWord.setPosition(0);
    toggleElementClassByKeyEvent(searchLinks, 'text-none');
  };

  inputKeyWordBox.addEventListener('keyup', async ({ target: { value }, key }) => {
    const searchKeywordBox = $('.search-keyword');
    if (key === KEY_ARROW_UP && searchKeywordBox) {
      keyupEvent();
      return;
    }

    if (key === KEY_ARROW_DOWN && searchKeywordBox) {
      keydownEvent();
      return;
    }

    if (searchWord.getTurn()) {
      searchWord.turnOff();
    }

    await delay(500); // fetch 보내기 전 딜레이 함수로 0.5초 blocking

    if (value) {
      const responseData = await fetchPostData('search', value);
      searchWord.setCurrentWord(value);
      searchWord.toggleRender(responseData);
    } else {
      const recentSearchBox = $('.search-recent');
      searchKeywordBox?.remove();

      if (searchWord.recentWords.length !== 0) {
        searchWord.turnOn();
        searchWord.toggleRender();
      } else recentSearchBox?.remove();
    }
  });

  inputKeyWordBox.addEventListener('focus', () => {
    searchWord.turnOn();
    searchWord.toggleRender();
  });

  inputKeyWordBtn.addEventListener('click', () => {
    const currentWord = searchWord.getCurrentWord();
    if (currentWord) {
      searchWord.pushRecentWords();
      searchWord.setCurrentWord('');

      inputKeyWordBox.value = '';
      inputKeyWordBox.focus();

      searchWord.turnOn();
      searchWord.toggleRender();
    }
  });
};
