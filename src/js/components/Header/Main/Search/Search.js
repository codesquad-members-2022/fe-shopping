import { localStorageDB } from '../../../../utils/localStorageDB.js';
import { fetchKeyword } from '../../../../utils/fetch.js';
import Component from '../../../../core/Component.js';
import SearchCategory from './components/SearchCategory.js';
import AutoComplete from './components/AutoComplete.js';
import RecentSearch from './components/RecentSearch.js';

export default class Search extends Component {
  setup() {
    this.$state = {
      searchWord: JSON.parse(localStorageDB.get('searchWord')) || [],
      autoComplete: null,
    };
    this.typingTimer = null;
    this.historyOn = true;
    this.selectedIdx = -1;
    this.doneTypingInterval = 500;
  }

  template() {
    return `
    <form class="search">
      <div class="search__category"></div>
      <input type="text" class="search__input" title="쿠팡 상품 검색" placeholder="찾고 싶은 상품을 검색해보세요!" />
      <a href="#" class="search__speech"></a>
      <a href="#" class="search__btn" title="검색"></a>
    </form>
    <div class="search__auto search-layer"></div>
    <div class="search__history search-layer"></div>
    `;
  }

  mounted() {
    const $searchCategory = document.querySelector('.search__category');
    const $searchAuto = document.querySelector('.search__auto');
    const $searchHistory = document.querySelector('.search__history');
    new SearchCategory($searchCategory);
    const autoComplete = new AutoComplete($searchAuto);
    this.$state.autoComplete = autoComplete;
    new RecentSearch($searchHistory, {
      searchWord: this.$state.searchWord,
      deleteAll: this.deleteAll.bind(this),
      deleteItem: this.deleteItem.bind(this),
      toggleHistory: this.toggleHistory.bind(this),
    });
  }

  setEvent() {
    this.addEvent('focusin', '.search__input', () => {
      this.showSearchHistoryLayer();
    });

    this.addEvent('submit', '.search', e => {
      e.preventDefault();
      if (!this.historyOn) return;
      this.saveSearchWord();
      this.showSearchHistoryLayer();
    });

    this.addEvent('input', '.search__input', ({ target }) => {
      this.setAutoComplete(target);
    });

    this.addEvent('keyup', '.search__input', e => {
      const { autoComplete } = this.$state;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') return;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.displaySearchAutoList(e.target, autoComplete), this.doneTypingInterval);
    });

    this.addEvent('keydown', '.search__input', e => {
      clearTimeout(this.typingTimer);
      if (!(e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;
      this.scrollAutoComplete(e.key);
    });
  }

  scrollAutoComplete(key) {
    const searchAutoList = document.querySelector('.search__auto--list');
    if (!searchAutoList.children.length) return;
    const MAX_IDX = searchAutoList.children.length - 1;
    const INITIAL_IDX = -1;

    const direction = {
      ArrowUp: () => {
        if (this.selectedIdx <= 0) {
          this.selectedIdx = MAX_IDX + 1;
          searchAutoList.children[0].classList.remove('selected');
        }
        searchAutoList.children[--this.selectedIdx].classList.add('selected');
        if (this.selectedIdx === MAX_IDX) return;
        searchAutoList.children[this.selectedIdx].nextSibling.classList.remove('selected');
      },
      ArrowDown: () => {
        if (this.selectedIdx === MAX_IDX) {
          this.selectedIdx = INITIAL_IDX;
          searchAutoList.children[MAX_IDX].classList.remove('selected');
        }
        searchAutoList.children[++this.selectedIdx].classList.add('selected');
        if (!this.selectedIdx) return;
        searchAutoList.children[this.selectedIdx].previousSibling.classList.remove('selected');
      },
    };

    direction[key]();
  }

  setAutoComplete(target) {
    const searchHistory = document.querySelector('.search__history');
    const searchAuto = document.querySelector('.search__auto');
    const userInput = target.value;
    searchHistory.classList.remove('show');
    searchAuto.classList.add('show');

    if (!userInput) {
      searchHistory.classList.add('show');
      searchAuto.classList.remove('show');
      return;
    }
  }

  async displaySearchAutoList(target, autoComplete) {
    const userInput = target.value;
    try {
      const suggestion = await fetchKeyword(userInput);
      autoComplete.setState({ suggestion, userInput });
    } catch (err) {
      console.log(err);
    }
  }

  showSearchHistoryLayer() {
    const searchHistory = document.querySelector('.search__history');
    const $searchAuto = document.querySelector('.search__auto');
    if (!this.$state.searchWord.length) return;
    if ($searchAuto.classList.contains('show')) return;
    searchHistory.classList.add('show');
  }

  saveSearchWord() {
    const MAX_RECENT_SEARCH_SIZE = 8;
    const searchInput = document.querySelector('.search__input');
    const word = searchInput.value;
    if (this.$state.searchWord.find(item => item.word === word)) return;
    this.setState({ searchWord: [...this.$state?.searchWord, { id: Date.now(), word }] });
    if (this.$state.searchWord.length >= MAX_RECENT_SEARCH_SIZE) {
      this.$state.searchWord.pop();
    }
    localStorageDB.set('searchWord', JSON.stringify(this.$state.searchWord));
  }

  deleteAll() {
    localStorageDB.remove('searchWord');
    this.setState({ searchWord: Array() });
  }

  toggleHistory() {
    const searchHistoryList = document.querySelector('.search__history--list');
    const historyOffMsg = document.querySelector('.history-off-msg');
    const historyOnOffBtn = document.querySelector('.history-onoff-btn');
    if (this.historyOn) {
      toggleHide();
      this.historyOn = false;
      historyOnOffBtn.textContent = '최근검색어켜기';
    } else {
      toggleHide();
      this.historyOn = true;
      historyOnOffBtn.textContent = '최근검색어끄기';
    }

    function toggleHide() {
      historyOffMsg.classList.toggle('hide');
      searchHistoryList.classList.toggle('hide');
    }
  }

  deleteItem(target) {
    const selectedItem = target.closest('.search__history--item');
    const itemId = Number(selectedItem.dataset.id);
    const searchWordArr = JSON.parse(localStorageDB.get('searchWord')).filter(item => item.id !== itemId);
    localStorageDB.set('searchWord', JSON.stringify(searchWordArr));
    this.setState({ searchWord: searchWordArr });
    this.showSearchHistoryLayer();
  }
}
