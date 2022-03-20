import { $ } from '../../utility/util.js';
import RecentWord from './recent-words.js';
import Autocomplete from './autocomplete.js';

export default class InputEvent {
  constructor() {
    this.recentWords = new RecentWord();
    this.autoComplete = new Autocomplete();
  }

  addInputEvent() {
    const $searchInput = $('.search-input');
    $searchInput.addEventListener('focus', this.drawHistoryContents);
    $searchInput.addEventListener('blur', this.nodrawHistoryContents);
    $searchInput.addEventListener('keyup', this.drawAutocomplete);
  }

  drawHistoryContents = () => this.recentWords.showRecentSearches();
  nodrawHistoryContents = () => this.recentWords.noShowRecentSearches();

  drawAutocomplete = ({ code }) => {
    if (code === 'ArrowDown') console.log(1);

    this.nodrawHistoryContents();
    this.autoComplete.checkInputText();
  };
}
