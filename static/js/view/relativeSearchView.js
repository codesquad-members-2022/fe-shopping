import {SearchView} from './searchView.js'

export class RelativeSearchView extends SearchView {
  constructor() {
    super();
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  renderRecentSearch(keywordList) {
    const keywordsTemplate = super.createKeywordsTemplate(keywordList);
    this.$popupKeywords.innerHTML = keywordsTemplate;
  }
}
