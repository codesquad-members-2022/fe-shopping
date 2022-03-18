import { $ } from '../../utility/util.js';
import { addEvent } from '../../utility/util.js';
import RecentWord from './recent-words.js';
import Autocomplete from './autocomplete.js';

export default class InputEvent {
  constructor() {
    this.recentWords = new RecentWord();
    this.autoComplete = new Autocomplete();
  }

  addInputEvent() {
    const $searchInput = $('.search-input');
    addEvent($searchInput, 'focus', this.drawHistoryContents);
    addEvent($searchInput, 'blur', this.nodrawHistoryContents);
    addEvent($searchInput, 'keyup', this.drawAutocomplete);
  }

  drawHistoryContents = () => this.recentWords.showRecentSearches();
  nodrawHistoryContents = () => this.recentWords.noShowRecentSearches();

  drawAutocomplete = () => {
    this.nodrawHistoryContents();
    this.autoComplete.checkInputText();
  };
}
