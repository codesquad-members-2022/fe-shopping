import { moveCarousel } from './carousel.js';

import { toggleDropdown, chooseCategory } from './input-category.js';
import { RecentSearch } from './search-recent.js';
import { AutoComplete } from './search-auto.js';

document.addEventListener('DOMContentLoaded', () => {
  moveCarousel();
  toggleDropdown();
  chooseCategory();

  const recentSearch = new RecentSearch();
  recentSearch.createRecentSearch();
  recentSearch.destroyRecentSearch();
  recentSearch.inputData();

  const autoComplete = new AutoComplete();
  autoComplete.createAutoComplete();
  autoComplete.hideAutoComplete();
});
