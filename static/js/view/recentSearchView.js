export class RecentSearchView {
  constructor() {
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }

  createKeywordsTemplate(keywordList, listClassName) {
    let keywordsTemplate = keywordList.reduce((template, keyword) => {
      template += `<li>
      <span>${keyword}</span>
      <button type='button' class='recent-keyword-button'>X</button>
      </li>`;
      return template;
    }, `<ul class=${listClassName}>`);
    keywordsTemplate += '</ul>';
    return keywordsTemplate;
  }

  renderRecentSearch(keywordList) {
    const textTemplate = '<h4 class="recent-search-text">최근 검색어</h4>';
    const keywordsTemplate = this.createKeywordsTemplate(keywordList, 'recent-search-list');
    const popupKeywordsTemplate = textTemplate + keywordsTemplate;
    this.$popupKeywords.innerHTML = popupKeywordsTemplate;
  }
}
