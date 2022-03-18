export class RecentSearchView {
  constructor() {
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  renderSearchHistory(keywordList) {
    let popupKeywordsTemplate = keywordList.reduce((template, keyword) => {
      template += `<li>${keyword}</li>`;
      return template;
    }, '<ul>');
    popupKeywordsTemplate += '</ul>'
    this.$popupKeywords.innerHTML = popupKeywordsTemplate;
  }
}
