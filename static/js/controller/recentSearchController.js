export class RecentSearchController {
  constructor(data, view) {
    this.recentSearchData = data;
    this.recentSearchView = view;
    this.$input = document.querySelector('.search-bar');
  }
  addInputFocusEvent () {
    this.$input.addEventListener('focus', () => {
      this.recentSearchData.createKeywordList();
      this.recentSearchView.renderSearchHistory();
    });
  }

  addInputKeyupEvent () {
    this.$input.addEventListener('keyup', ({target}) => {
      this.recentSearchData.addKeyword(target.value);
      this.recentSearchView.renderSearchHistory();
    });
  }
}
