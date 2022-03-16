import { moveCarousel } from './carousel.js';
import { toggleDropdown, chooseCategory } from './input-category.js';
<<<<<<< HEAD
import { RecentSearch } from './search-recent.js';
import { AutoComplete } from './search-auto.js';
=======
>>>>>>> 49ea395 (feat: 카테고리 드롭다운 구현)

document.addEventListener('DOMContentLoaded', () => {
  moveCarousel();
  toggleDropdown();
  chooseCategory();
<<<<<<< HEAD

  const recentSearch = new RecentSearch();
  recentSearch.createRecentSearch();
  recentSearch.destroyRecentSearch();
  recentSearch.inputData();

  const autoComplete = new AutoComplete();
  autoComplete.createAutoComplete();
  autoComplete.destroyAutoComplete();
=======
>>>>>>> 49ea395 (feat: 카테고리 드롭다운 구현)
});
