import { $, $$, fetchPostData, delay } from '../utils/util.js';
import { KEY_UP_CODE, KEY_DOWN_CODE } from '../constants/constant.js';
import SearchWord from '../package/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__input');
  const inputKeyWordBtn = $('.main-header__input--btn');

  const toggleElementClassByKey = (element, className) => {
    element.forEach(element => {
      parseInt(element.getAttribute('data-id')) === searchWord.index
        ? element.classList.remove(className)
        : element.classList.add(className);
    });
  };

  const keyupEvent = () => {
    const searchLinks = $$('.search--link');
    searchWord.index--;
    if (searchWord.index < 0) searchWord.index = searchLinks.length - 1;
    toggleElementClassByKey(searchLinks, 'text-none');
  };

  const keydownEvent = () => {
    const searchLinks = $$('.search--link');
    searchWord.index++;
    if (searchWord.index >= searchLinks.length) searchWord.index = 0;
    toggleElementClassByKey(searchLinks, 'text-none');
  };

  inputKeyWordBox.addEventListener('keyup', async ({ target: { value }, keyCode }) => {
    const searchKeywordBox = $('.search-keyword');
    if (keyCode === KEY_UP_CODE && searchKeywordBox) {
      keyupEvent();
      return;
    }

    if (keyCode === KEY_DOWN_CODE && searchKeywordBox) {
      keydownEvent();
      return;
    }

    if (searchWord.getTurn()) {
      searchWord.turnOff();
    }

    await delay(500);

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
