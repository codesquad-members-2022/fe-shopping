import { $ } from '../../utility/util.js';
import { addEvent } from '../../utility/util.js';
import History from './history.js';
import AutoComplete from './autoComplete.js';

export default class InputEvent {
  constructor() {
    this.history = new History();
    this.autoComplete = new AutoComplete();
  }

  addInputEvent() {
    const $searchInput = $('.search-input');
    addEvent($searchInput, 'focus', this.drawHistoryContents);
    addEvent($searchInput, 'blur', this.nodrawHistoryContents);
  }

  drawHistoryContents = () => {
    this.history.showRecentSearches();
  };

  nodrawHistoryContents = () => {
    this.history.noShowRecentSearches();
  };
}
