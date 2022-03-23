import {SearchView} from './searchView.js'

export class RelativeSearchView extends SearchView {
  constructor() {
    super();
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }

  createHighlightKeywordList(keywordList, searchKeyword) {
    const highlightedKeywordList = keywordList.map((keyword) => {
      const highlightKeywordIndex = keyword.indexOf(searchKeyword);
      const leftKeyword = keyword.slice(0, highlightKeywordIndex);
      const rightKeyword = keyword.slice(highlightKeywordIndex + searchKeyword.length);
      const highlightedKeyword = `${leftKeyword}<strong>${searchKeyword}</strong>${rightKeyword}`;
      return highlightedKeyword;
    });
    return highlightedKeywordList;
  }

  renderRelativeSearch(keywordList, searchKeyword) {
    const relativeKeywordsList = keywordList.map(({keyword}) => keyword);
    const highlightedKeywordList = this.createHighlightKeywordList(relativeKeywordsList, searchKeyword);
    const keywordsTemplate = super.createKeywordsTemplate(highlightedKeywordList, 'relative-keyword-list');
    this.$popupKeywords.innerHTML = keywordsTemplate;
  }
}
