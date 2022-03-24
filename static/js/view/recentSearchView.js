export class RecentSearchView {
  constructor() {
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }

  createKeywordsTemplate(keywordList, keywordIndexList, listClassName) {
    let keywordsTemplate = keywordList.reduce((template, keyword, index) => {
      template += `<li data-index=${keywordIndexList[index]}>
      ${keyword}
      <button type='button' class='recent-keyword-button'>X</button>
      </li>`;
      return template;
    }, `<ul class=${listClassName}>`);
    keywordsTemplate += '</ul>';
    return keywordsTemplate;
  }

  renderRecentSearch(keywordList, keywordIndexList) {
    const textTemplate = '<h3 class="recent-search-text">최근 검색어</h3>';
    const keywordsTemplate = this.createKeywordsTemplate(keywordList, keywordIndexList, 'recent-search-list');
    const popupKeywordsTemplate = textTemplate + keywordsTemplate;
    this.$popupKeywords.innerHTML = popupKeywordsTemplate;
  }
}
