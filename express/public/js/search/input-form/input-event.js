import { $ } from '../../utility/util.js';
import { addEvent } from '../../utility/util.js';
import recentWords from './recent-words.js';
import Autocomplete from './autocomplete.js';

export default class InputEvent {
  constructor() {
    this.recentWords = new recentWords();
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
    this.Autocomplete.showAutocomplete();
  };
}
