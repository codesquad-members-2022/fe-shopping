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
    this.myLocalStorage.setItem('search-keyword-cnt', 0);
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
        this.saveRecentCntToRocalstorage();
        this.saveRecentSearchWordToRocalstorage(this.searchText.value);
      }
    });

    this.recentDeletion.addEventListener('click', () => {});

    this.recentOff.addEventListener('click', ({ target }) => {
      if (target.dataset.off) {
        if (this.recentFlag === false) this.showRecent();
        else if (this.recentFlag === true) this.hideRecent();
      } else if (target.dataset.deletion) {
        // localstorage.clear
        // localstoragecnt.set = 0
        // 최근검색어 리스트 innerHTML 비워주기
      }
    });
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
      `search-keyword-${this.myLocalStorage.getItem('search-keyword-cnt')}`,
      searchWord
    );
  }

  loadRecentSearchWordAtRocalstorage() {
    // const arr = [];
    // rocalstorage 크기 만큼 반복문
    // createRecentList()
    // 배열 리버스해서 반환
  }

  createRecentList() {
    // li 태그 에 rocalstorage 데이터 파싱
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

  showRecentSearchWord() {
    // loadRecentSearchWordAtRocalstorage()
    // showRecent()
  }

  raiseLocalStorageIndex() {
    this.localStroageIndex++;
  }
}
