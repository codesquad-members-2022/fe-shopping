export class SearchBar {
  constructor([$recentKeywords, $categories, RECENT_SEARCH_KEYWORDS, searchStorage]) {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$recentKeywords = $recentKeywords;
    this.$categories = $categories;
    this.RECENT_SEARCH_KEYWORDS = RECENT_SEARCH_KEYWORDS;
    this.searchStorage = searchStorage;
    this.addEventListener();
  }

  saveRecentSearchKeyword() {
    const searchValue = this.$searchWrap.querySelector('.search-input').value;
    if (!searchValue) return;
    const searchValues = this.searchStorage.getItem(this.RECENT_SEARCH_KEYWORDS)
      ? `${this.searchStorage.getItem(this.RECENT_SEARCH_KEYWORDS)},${searchValue}`
      : searchValue;
    this.searchStorage.setItem(this.RECENT_SEARCH_KEYWORDS, searchValues);
    this.$searchWrap.querySelector('.search-input').value = '';
  }

  addSearchButtonEvent() {
    this.$searchWrap.querySelector('.search-button').addEventListener('click', () => {
      this.saveRecentSearchKeyword();
    });
  }

  addSearchInputEvent() {
    this.$searchWrap.querySelector('.search-input').addEventListener('focus', () => {
      if (!this.$recentKeywords.querySelectorAll('li').length) return;
      this.$recentKeywords.classList.add('active');
      this.$categories.classList.remove('active');
    });
    this.$searchWrap.querySelector('.search-input').addEventListener('keyup', (event) => {
      const key = event.key || event.keyCode;
      if (key === 'Enter' || key === 13) this.saveRecentSearchKeyword();
    });
  }

  addEventListener() {
    this.addSearchButtonEvent();
    this.addSearchInputEvent();
  }
}
