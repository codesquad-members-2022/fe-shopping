export class SearchView {
  constructor() {
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }

  createKeywordsTemplate(keywordList, listClassName) {
    let keywordsTemplate = keywordList.reduce((template, keyword) => {
      template += `<li>${keyword}</li>`;
      return template;
    }, `<ul class=${listClassName}>`);
    keywordsTemplate += '</ul>';
    return keywordsTemplate;
  }
  renderSearchKeywords(keywordList, listClassName) {
    const keywordsTemplate = this.createKeywordsTemplate(keywordList, listClassName);
    this.$popupKeywords.innerHTML = keywordsTemplate;
  }
}
