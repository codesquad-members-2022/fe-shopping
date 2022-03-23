import {RecentSearchModel} from '../model/recentSearchModel.js';
import {RecentSearchView} from '../view/recentSearchView.js';

export class RecentSearchController {
  constructor() {
    this.recentSearchModel = new RecentSearchModel(window.sessionStorage);
    this.recentSearchView = new RecentSearchView();
    this.$input = document.querySelector('.search-bar-input');
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  
  addInputFocusEvent () {
    this.$input.addEventListener('focus', () => {
      if (!this.recentSearchModel.isEmpty()) {
        this.$popupKeywords.classList.remove('hidden');
      }
      this.recentSearchModel.updateKeywordList();
      this.recentSearchView.renderRecentSearch(this.recentSearchModel.keywordList);
    });
  }

  addInputKeyDownEvent () {
    this.$input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.recentSearchModel.addKeyword(event.target.value);
        event.target.value = '';
      }
    });
  }
}
