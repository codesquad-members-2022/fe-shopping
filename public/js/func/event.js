import { moveCarousel } from './carousel.js';
<<<<<<< HEAD
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
  autoComplete.destroyAutoComplete();
=======

document.addEventListener('DOMContentLoaded', () => {
  moveCarousel();

  const searchCategory = document.querySelector('.search-category');
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
});
