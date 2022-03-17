import { SearchCategoriesButton } from './search/SearchCategoriesButton.js';
import { SearchCategories } from './search/SearchCategories.js';
import { SearchBar } from './search/SearchBar.js';
import { RecentSearchKeywords } from './search/RecentSearchKeywords.js';

export class Header {
  constructor() {
    this.RECENT_SEARCH_KEYWORDS = 'recentSearchKeywords';
    this.searchStorage = localStorage;
    this.renderSearchArea();
  }

  renderSearchArea() {
    const searchCategoriesButton = new SearchCategoriesButton();
    const searchCategories = new SearchCategories(searchCategoriesButton.updateCategory.bind(searchCategoriesButton));
    const recentSearchKeywords = new RecentSearchKeywords([this.RECENT_SEARCH_KEYWORDS, this.searchStorage]);
    new SearchBar([
      recentSearchKeywords.$recentKeywords,
      searchCategories.$categories,
      this.RECENT_SEARCH_KEYWORDS,
      this.searchStorage,
    ]);
  }
}
