export class RecentSearchView {
  constructor(data) {
    this.recentSearchStorage = data;
  }
  renderSearchHistory() {
    const $popupKeywords = document.querySelector('.popup-keywords');
    let popupKeywordsTemplate = this.recentSearchStorage.reduce((template, recentSearch) => {
      template += `<li>${recentSearch}</li>`;
      return template;
    }, '<ul>');
    popupKeywordsTemplate+= '</ul>'
    $popupKeywords.innerHTML = popupKeywordsTemplate;
  }
}