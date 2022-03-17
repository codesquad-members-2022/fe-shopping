import { $, fetchPostData, delay } from '../utils/util.js';
import SearchWord from '../package/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__input');
  const inputKeyWordBtn = $('.main-header__input--btn');
  let id = 0;

  inputKeyWordBox.addEventListener('keyup', async ({ target, keyCode }) => {
    const searchKeywordBox = $('.search-keyword');
    if (keyCode === 38 && searchKeywordBox) {
      const searchLinks = document.querySelectorAll('.search--link');
      id--;
      if (id < 0) id = 9;
      searchLinks.forEach(element => {
        if (parseInt(element.getAttribute('data-id')) === id) element.style.textDecoration = 'underline';
        else element.style.textDecoration = 'none';
      });
      return;
    }

    if (keyCode === 40 && searchKeywordBox) {
      const searchLinks = document.querySelectorAll('.search--link');
      id++;
      if (id >= 10) id = 0;
      searchLinks.forEach(element => {
        if (parseInt(element.getAttribute('data-id')) === id) element.style.textDecoration = 'underline';
        else element.style.textDecoration = 'none';
      });
      return;
    }

    if (searchWord.getTurn()) {
      searchWord.turnOff();
    }

    await delay(500);

    if (target.value) {
      const responseData = await fetchPostData('search', target.value);
      searchWord.setCurrentWord(target.value);
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
