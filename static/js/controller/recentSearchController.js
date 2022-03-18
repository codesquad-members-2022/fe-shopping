export class RecentSearchController {
  constructor(data, view) {
    this.recentSearchData = data;
    this.recentSearchView = view;
    this.$input = document.querySelector('.search-bar');
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }
  addInputFocusEvent () {
    this.$input.addEventListener('focus', () => {
      this.$popupKeywords.classList.toggle('hidden');
      this.recentSearchData.createKeywordList();
      this.recentSearchView.renderSearchHistory(this.recentSearchData.keywordList);
    });
  }

  addInputFocusOutEvent () {
    this.$input.addEventListener('focusout', () => {
      this.$popupKeywords.classList.toggle('hidden');
    });
  }

  addInputKeyupEvent () {
    this.$input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.recentSearchData.addKeyword(event.target.value);
        this.recentSearchView.renderSearchHistory(this.recentSearchData.keywordList);
        event.target.value = '';
      }
    });
  }
}
