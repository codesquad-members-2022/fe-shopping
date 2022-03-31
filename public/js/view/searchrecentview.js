import View from './view.js';

export default class SearchRecentView extends View {
  init(el) {
    super.init(el);
    this.searchText = document.querySelector('.search-text');
    this.recentList = this.el.querySelector('.search-recent__list');
    this.recentDeletion = this.el.querySelectorAll('.search-recent__link')[0];
    this.recentOff = this.el.querySelectorAll('.search-recent__link')[1];
    this.recentActive = this.el.querySelector('.search-recent--active');
    this.recentDisable = this.el.querySelector('.search-recent--disable');
    this.recentFlag = false;
    this.myLocalStorage = localStorage;
    this.setUp();
  }

  setUp() {
    this.clearRecentList();
    this.hide(this.el);
    this.bindEvents();
  }

  bindEvents() {
    this.searchText.addEventListener('focusin', () => {
      if (!this.searchText.value.toString().trim()) this.show(this.el);
    });

    this.searchText.addEventListener('focusout', ({ relatedTarget }) => {
      if (!relatedTarget) {
        this.hide(this.el);
        return;
      }
    });

    this.searchText.addEventListener('input', () => {
      if (!this.searchText.value.toString().trim()) this.show(this.el);
    });

    this.searchText.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.saveRecentSearchWordToRocalstorage(this.searchText.value);
        this.loadRecentSearchWordAtRocalstorage();
        this.saveRecentCntToRocalstorage();
        this.clearSearchWord();
      }
    });

    this.recentDeletion.addEventListener('click', () => {
      this.clearRecentList();
    });

    this.recentOff.addEventListener('click', () => {
      if (this.recentFlag === false) this.showRecent();
      else if (this.recentFlag === true) this.hideRecent();
    });
  }

  clearSearchWord() {
    this.searchText.value = '';
  }

  saveRecentCntToRocalstorage() {
    this.myLocalStorage.setItem(
      'search-keyword-cnt',
      this.raiseRecentCntToRocalstorage()
    );
  }

  raiseRecentCntToRocalstorage() {
    return parseInt(this.myLocalStorage.getItem('search-keyword-cnt')) + 1;
  }

  saveRecentSearchWordToRocalstorage(searchWord) {
    this.myLocalStorage.setItem(
      `search-keyword-${parseInt(
        this.myLocalStorage.getItem('search-keyword-cnt')
      )}`,
      searchWord
    );
  }

  loadRecentSearchWordAtRocalstorage() {
    const localStorageDataList = [];

    for (let i = 0, length = this.myLocalStorage.length; i < length; i++) {
      if (!this.myLocalStorage.getItem(`search-keyword-${i}`)) continue;

      localStorageDataList.push(
        this.myLocalStorage.getItem(`search-keyword-${i}`)
      );
    }

    localStorageDataList.reverse();
    this.insertRecentList(localStorageDataList);
  }

  insertRecentList(localStorageDataList) {
    this.recentList.innerHTML = this.createRecentList(localStorageDataList);
  }

  createRecentList(localStorageDataList) {
    return localStorageDataList.reduce((acc, cur) => {
      return (
        acc +
        `<li class="search-recent__item">
          <a href="#" class="search-recent__link">${cur}</a>
         </li>`
      );
    }, '');
  }

  clearRecentList() {
    this.recentList.innerHTML = '';
    this.myLocalStorage.clear();
    this.myLocalStorage.setItem('search-keyword-cnt', 0);
  }

  showRecent() {
    this.hide(this.recentActive);
    this.show(this.recentDisable);
    this.recentOff.textContent = '최근검색어켜기';
    this.recentFlag = true;
  }

  hideRecent() {
    this.show(this.recentActive);
    this.hide(this.recentDisable);
    this.recentOff.textContent = '최근검색어끄기';
    this.recentFlag = false;
  }
}
