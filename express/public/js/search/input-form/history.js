import { $ } from '../../utility/util.js';
export default class History {
  showRecentSearches() {
    const $searchHistory = $('.search-history');
    $searchHistory.classList.remove('hidden');
  }

  noShowRecentSearches() {
    const $searchHistory = $('.search-history');
    $searchHistory.classList.add('hidden');
  }
}
