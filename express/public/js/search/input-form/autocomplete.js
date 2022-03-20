import { $ } from '../../utility/util.js';
import { getCompleteData } from '../../utility/util.js';
import RecentWord from './recent-words.js';

export default class Autocomplete {
  constructor() {
    this.$autocompleteMenu = $('#autocomplete-menu');
    this.$popupMenuList = $('#input-popup-menu-list');
  }
  showAutocomplete() {
    this.$autocompleteMenu.classList.remove('hidden');
  }

  noShowAutocomplete() {
    this.$autocompleteMenu.classList.add('hidden');
  }

  checkInputText() {
    const $searchInput = $('.search-input');
    const inputValue = $searchInput.value;

    if (!inputValue.length) {
      this.noShowAutocomplete();
      this.$popupMenuList.innerHTML = '검색 결과가 없습니다';
      RecentWord.prototype.showRecentSearches();
      return;
    }

    this.showAutocomplete();
    const searchQuery = this.changeInputToQuery(inputValue);

    if (!searchQuery) {
      this.$autocompleteMenu.innerHTML = '검색 결과가 없습니다';
      return;
    }
  }

  changeInputToQuery(inputValue) {
    const firstWord = inputValue.split('')[0];

    switch (firstWord) {
      case 'ㄱ':
      case '가':
        this.delay500ms(getCompleteData('ga'));
        return true;
      case 'ㄴ':
      case '나':
        this.delay500ms(getCompleteData('na'));
        return true;
      case 'ㄷ':
      case '다':
        this.delay500ms(getCompleteData('da'));
        return true;
      case 'ㄹ':
      case '라':
        this.delay500ms(getCompleteData('ra'));
        return true;
      case 'ㅁ':
      case '마':
        this.delay500ms(getCompleteData('ma'));
        return true;
      case 'ㅂ':
      case '바':
        this.delay500ms(getCompleteData('ba'));
        return true;
      default:
        return false;
    }
  }

  delay500ms(completeDataPromise) {
    setTimeout(() => this.showCompleteWord(completeDataPromise), 500);
  }

  async showCompleteWord(completeDataPromise) {
    const wordData = await completeDataPromise;
    const dataTemplate = wordData.reduce(
      (pre, curList) =>
        (pre += `<li class = "input-popup-menu-item">${curList.keyword}</li>`),
      ''
    );

    this.$popupMenuList.innerHTML = dataTemplate;
  }
}
