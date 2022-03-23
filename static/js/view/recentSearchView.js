import {SearchView} from './searchView.js'

export class RecentSearchView extends SearchView {
  constructor() {
    super();
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  renderRecentSearch(keywordList) {
    let popupKeywordsTemplate = '<h3 class="recent-search-text">최근 검색어</h3>';
    const keywordsTemplate = super.createKeywordsTemplate(keywordList, 'recent-search-list');
    popupKeywordsTemplate += keywordsTemplate;
    this.$popupKeywords.innerHTML = popupKeywordsTemplate;
  }
}
