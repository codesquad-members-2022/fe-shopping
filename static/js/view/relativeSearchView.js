export class RelativeSearchView {
  createRelativeKeywordList(keywordList, searchKeyword) {
    let relativeKeywordTemplate = keywordList.reduce((highlightedKeyword, keyword) => {
      const highlightKeywordIndex = keyword.indexOf(searchKeyword);
      const leftKeyword = keyword.slice(0, highlightKeywordIndex);
      const rightKeyword = keyword.slice(highlightKeywordIndex + searchKeyword.length);
      highlightedKeyword += `<li>${leftKeyword}<strong>${searchKeyword}</strong>${rightKeyword}</li>`;
      return highlightedKeyword;
    }, `<ul class='relative-keyword-list'>`);
    relativeKeywordTemplate += '</ul>';
    return relativeKeywordTemplate;
  }

  renderRelativeSearch(keywordList, searchKeyword) {
    const $popupKeywords = document.querySelector('.popup-keywords');
    const relativeKeywordsList = keywordList.map(({keyword}) => keyword);
    const relativeKeywordTemplate = this.createRelativeKeywordList(relativeKeywordsList, searchKeyword);
    $popupKeywords.innerHTML = relativeKeywordTemplate;
  }

  getKeywordListText(keywordListNumber) {
    const $selectedKeyword = document.querySelector(`.relative-keyword-list li:nth-child(${keywordListNumber}`);
    const keywordListText = $selectedKeyword ? $selectedKeyword.innerText : null;
    return keywordListText;
  }
}
