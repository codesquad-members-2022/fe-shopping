import { SearchCategoriesButton } from './search/SearchCategoriesButton.js';
import { SearchCategories } from './search/SearchCategories.js';
import { SearchBar } from './search/SearchBar.js';
import { RecentSearchKeywords } from './search/RecentSearchKeywords.js';

export class Header {
  constructor() {
    this.STORAGE_KEY = 'recentSearchKeywords';
    this.searchStorage = localStorage;
    this.renderSearchArea();
  }

  renderSearchArea() {
    const searchCategoriesButton = new SearchCategoriesButton();
    const searchCategories = new SearchCategories(searchCategoriesButton.updateCategory.bind(searchCategoriesButton));
    const recentSearchKeywords = new RecentSearchKeywords([this.STORAGE_KEY, this.searchStorage]);
    const searchBar = new SearchBar([
      recentSearchKeywords.$recentKeywords,
      searchCategories.$categories,
      this.STORAGE_KEY,
      this.searchStorage,
    ]);
  }
}
