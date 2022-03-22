export class SearchBar {
  constructor() {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$searchInput = this.$searchWrap.querySelector('.search-input');
  }

  connect(recentSearchKeywords, automaticCompletion) {
    this.recentSearchKeywords = recentSearchKeywords;
    this.automaticCompletion = automaticCompletion;
  }

  addSearchValueSubmitEvent() {
    this.$searchWrap.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const searchValue = this.$searchInput.value;
      this.recentSearchKeywords.saveRecentSearchKeyword(searchValue);
    });
  }

  addSearchInputFocusEvent() {
    this.$searchInput.addEventListener('focus', () => {
      if (this.$searchInput.value) return;
      this.recentSearchKeywords.showRecentKeywords();
    });
  }

  addSearchInputKeyupEvent() {
    this.$searchInput.addEventListener('input', async ({ target }) => {
      const searchValue = target.value;
      if (searchValue) {
        this.recentSearchKeywords.hide();
        this.automaticCompletion.render(searchValue);
      } else {
        this.automaticCompletion.hide();
        this.recentSearchKeywords.show();
      }
    });
  }

  addSearchBarBlurEvent() {
    this.$searchInput.addEventListener('blur', () => {
      this.recentSearchKeywords.hide();
      this.automaticCompletion.hide();
    });
  }

  addEventListener() {
    this.addSearchValueSubmitEvent();
    this.addSearchInputFocusEvent();
    this.addSearchInputKeyupEvent();
    this.addSearchBarBlurEvent();
  }

  init(recentSearchKeywords, automaticCompletion) {
    this.connect(recentSearchKeywords, automaticCompletion);
    this.addEventListener();
  }
}
