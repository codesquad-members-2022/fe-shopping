import { $ } from '../../utility/util.js';
export default class RecentWord {
  showRecentSearches() {
    const $searchHistory = $('#recent-words-menu');
    $searchHistory.classList.remove('hidden');
  }

  noShowRecentSearches() {
    const $searchHistory = $('#recent-words-menu');
    $searchHistory.classList.add('hidden');
  }
}
