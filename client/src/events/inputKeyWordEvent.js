import { $, fetchPostData, delay } from '../utils/util.js';
import SearchWord from '../package/search/SearchWord.js';

export const inputKeyWordEvent = () => {
  const searchWord = new SearchWord();
  const inputKeyWordBox = $('.main-header__input');
  const inputKeyWordBtn = $('.main-header__input--btn');

  inputKeyWordBox.addEventListener('keyup', async ({ target }) => {
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
      const searchKeywordBox = $('.search-keyword');
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
      searchWord.recentWords.push(currentWord);
      searchWord.setCurrentWord('');
      inputKeyWordBox.value = '';
      inputKeyWordBox.focus();
      searchWord.turnOn();
      searchWord.toggleRender();
    }
  });
};
