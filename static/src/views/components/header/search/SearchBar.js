export class SearchBar {
  constructor([$recentKeywords, $categories, STORAGE_KEY, searchStorage]) {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$recentKeywords = $recentKeywords;
    this.$categories = $categories;
    this.STORAGE_KEY = STORAGE_KEY;
    this.searchStorage = searchStorage;
    this.addEventListener();
  }

  saveRecentSearchKeyword() {
    const searchValue = this.$searchWrap.querySelector('.search-input').value;
    if (!searchValue) return;
    const searchValues = this.searchStorage.getItem(this.STORAGE_KEY)
      ? `${this.searchStorage.getItem(this.STORAGE_KEY)},${searchValue}`
      : searchValue;
    this.searchStorage.setItem(this.STORAGE_KEY, searchValues);
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
