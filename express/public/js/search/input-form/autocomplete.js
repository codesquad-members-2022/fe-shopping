import { $ } from '../../utility/util.js';
import { getCompleteData } from '../../utility/util.js';
import RecentWord from './recent-words.js';
export default class Autocomplete {
  showAutocomplete() {
    const $autocompleteMenu = $('#autocomplete-menu');
    $autocompleteMenu.classList.remove('hidden');
  }

  noShowAutocomplete() {
    const $autocompleteMenu = $('#autocomplete-menu');
    $autocompleteMenu.classList.add('hidden');
  }

  checkInputText() {
    const $searchInput = $('.search-input');
    const inputValue = $searchInput.value;

    if (inputValue) this.showAutocomplete();

    switch (inputValue) {
      case '가':
        this.check500ms(getCompleteData('ga'));
        break;
      case '나':
        this.check500ms(getCompleteData('na'));
        break;
      case '다':
        this.check500ms(getCompleteData('da'));
        break;
      case '라':
        this.check500ms(getCompleteData('ra'));
        break;
      case '마':
        this.check500ms(getCompleteData('ma'));
        break;
      case '바':
        this.check500ms(getCompleteData('ba'));
        break;
      case '':
        this.noShowAutocomplete();
        RecentWord.prototype.showRecentSearches();
        const $autocompleteMenu = $('#input-popup-menu-list');
        $autocompleteMenu.innerHTML = '검색 결과가 없습니다';
        return;
    }
  }

  check500ms(completeData) {
    setTimeout(() => this.showCompleteWord(completeData), 500);
  }

  async showCompleteWord(completeData) {
    const wordData = await completeData;
    const dataTemplate = wordData.reduce(
      (pre, curList) =>
        (pre += `<li class = "input-popup-menu-item">${curList.keyword}</li>`),
      ''
    );

    const $autocompleteMenu = $('#input-popup-menu-list');
    $autocompleteMenu.innerHTML = dataTemplate;
  }
}
