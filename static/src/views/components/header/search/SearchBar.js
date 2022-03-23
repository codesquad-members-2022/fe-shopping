export class SearchBar {
  constructor() {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$searchInput = this.$searchWrap.querySelector('.search-input');
    this.status = this.$searchInput.value;
  }

  connect(recentSearchKeywords, automaticCompletion) {
    this.recentSearchKeywords = recentSearchKeywords;
    this.automaticCompletion = automaticCompletion;
  }

  addSearchValueSubmitEvent() {
    this.$searchWrap.querySelector('form').addEventListener('submit', e => {
      this.status = this.$searchInput.value;
      this.recentSearchKeywords.saveRecentSearchKeyword(this.status);
    });
  }

  addSearchInputFocusEvent() {
    this.$searchInput.addEventListener('focus', () => {
      if (this.status) return;
      this.recentSearchKeywords.showRecentKeywords();
    });
  }

  addSearchValueInputEvent() {
    this.$searchInput.addEventListener('input', async event => {
      const key = event.key || event.keyCode;
      if (['ArrowDown', 'ArrowUp'].includes(key)) return;
      this.status = this.$searchInput.value;
      if (this.status) {
        this.recentSearchKeywords.hide();
        this.automaticCompletion.render(this.status);
      } else {
        this.automaticCompletion.hide();
        this.recentSearchKeywords.showRecentKeywords();
      }
    });
  }

  updateSearchValue(wordsInSearchPop, currentActiveIndex) {
    const currentActiveWord = wordsInSearchPop[currentActiveIndex];
    if (!currentActiveWord) return;
    this.$searchInput.value = currentActiveWord.querySelector('span').textContent;
    currentActiveWord.classList.add('active');
  }

  isPointerOnSearchPop(currentIndex) {
    return currentIndex >= 0 ? true : false;
  }

  inactivateWordInSearchPop(wordsInSearchPop, currentIndex) {
    if (this.isPointerOnSearchPop(currentIndex)) wordsInSearchPop[currentIndex].classList.remove('active');
  }

  moveActivePointerToUp(wordsInSearchPop, searchPopInfo) {
    this.inactivateWordInSearchPop(wordsInSearchPop, searchPopInfo.currentIndex);
    --searchPopInfo.currentIndex;
    if (!this.isPointerOnSearchPop(searchPopInfo.currentIndex)) this.$searchInput.value = searchPopInfo.previousValue;
    this.updateSearchValue(wordsInSearchPop, searchPopInfo.currentIndex);
  }

  moveActivePointerToDown(wordsInSearchPop, searchPopInfo) {
    this.inactivateWordInSearchPop(wordsInSearchPop, searchPopInfo.currentIndex);
    if (!this.isPointerOnSearchPop(searchPopInfo.currentIndex)) searchPopInfo.previousValue = this.$searchInput.value;
    ++searchPopInfo.currentIndex;
    if (searchPopInfo.currentIndex > wordsInSearchPop.length - 1) searchPopInfo.currentIndex = 0;
    this.updateSearchValue(wordsInSearchPop, searchPopInfo.currentIndex);
  }

  addSearchInputKeyDownEvent() {
    const searchPopInfo = {
      currentIndex: -1,
      previousValue: ''
    };
    this.$searchInput.addEventListener('keydown', event => {
      if (event.isComposing) return;
      const key = event.key || event.keyCode;
      const wordsInSearchPop = this.$searchWrap.querySelectorAll('.search-pop.active li');
      switch (key) {
        case 'ArrowUp':
          this.moveActivePointerToUp(wordsInSearchPop, searchPopInfo);
          break;
        case 'ArrowDown':
          this.moveActivePointerToDown(wordsInSearchPop, searchPopInfo);
          break;
        case 'Backspace':
          this.inactivateWordInSearchPop(wordsInSearchPop, searchPopInfo);
          searchPopInfo.currentIndex = -1;
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
    this.addSearchValueInputEvent();
    this.addSearchBarBlurEvent();
    this.addSearchInputKeyDownEvent();
  }

  init(recentSearchKeywords, automaticCompletion) {
    this.connect(recentSearchKeywords, automaticCompletion);
    this.addEventListener();
  }
}
