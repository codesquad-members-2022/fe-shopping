export class RecentSearchController {
  constructor(model, view) {
    this.recentSearchModel = model;
    this.recentSearchView = view;
    this.$input = document.querySelector('.search-bar-input');
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  addInputFocusEvent () {
    this.$input.addEventListener('focus', () => {
      if (!this.recentSearchModel.isEmpty()) {
        this.$popupKeywords.classList.remove('hidden');
      }
      this.recentSearchModel.createKeywordList();
      this.recentSearchView.renderRecentSearch(this.recentSearchModel.keywordList);
    });
  }

  addInputKeyDownEvent () {
    this.$input.addEventListener('keydown', (event) => {
      this.$popupKeywords.classList.add('hidden');
      if (event.key === 'Enter') {
        this.recentSearchModel.addKeyword(event.target.value);
        event.target.value = '';
      }
    });
  }
}
