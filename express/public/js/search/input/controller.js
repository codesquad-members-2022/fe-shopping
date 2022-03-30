import { $ } from '../../utility/util.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.$searchInput = $('.search-input');
    this.$popupMenuList = $('#input-popup-menu-list');
    this.searchListNum = 1;
  }

  startInput() {
    this.view.addInputEvent(this);
  }

  noShowRecentSearches(relatedTarget) {
    if (relatedTarget && relatedTarget.className === 'search-enter-btn') return;

    if (relatedTarget && relatedTarget.className === 'history-delete-btn') {
      this.view.addDeleteEventHistoryBtn(this);
      return;
    }

    if (relatedTarget && relatedTarget.className === 'history-off-btn') {
      this.view.addOfOffEventHistoryBtn();
      return;
    }

    this.view.hideRecentSearches();
  }

  deleteHistoryList() {
    const wordData = this.model.resetRecentWord();
    this.view.renderRecentWord(wordData);
  }

  addRecentData = () => {
    const inputValue = this.$searchInput.value;

    const recentStore = this.model.addRecentWord(inputValue);
    this.view.renderRecentWord(recentStore);
    this.$searchInput.value = '';
  };

  drawInputMenu = () => {
    if (this.$searchInput.value) {
      this.checkInputText(this.$searchInput.value);
      return;
    }

    this.view.showRecentSearches();
  };

  checkInputText() {
    const inputValue = this.$searchInput.value;

    if (!inputValue.length) {
      this.view.hideAutocomplete();
      this.$popupMenuList.innerHTML = '검색 결과가 없습니다';
      this.view.showRecentSearches();
      return;
    }

    this.view.showAutocomplete();
    this.changeInputToQuery(inputValue);
  }

  async changeInputToQuery(inputValue) {
    const firstWord = inputValue.split('')[0];
    const completeDataPromise = await this.model.getCompleteData(firstWord);

    if (!completeDataPromise) {
      this.$popupMenuList.innerHTML = '검색 결과가 없습니다';
      return;
    }

    this.delayCompleteWord(completeDataPromise, inputValue);
  }

  delayCompleteWord(completeDataPromise, inputValue) {
    setTimeout(() => this.view.showCompleteWord(completeDataPromise, inputValue), 1);
  }

  drawAutocomplete = ({ code }) => {
    if (code === 'ArrowDown' || code === 'ArrowUp') {
      this.findDirection(code);
    }

    this.view.hideRecentSearches();
    this.checkInputText();
  };

  findDirection(code) {
    if (!this.$popupMenuList.firstElementChild) return;

    code === 'ArrowDown' ? this.chooseWordDownside() : this.chooseWordUpside();
  }

  chooseWordDownside() {
    if (this.searchListNum > this.$popupMenuList.childElementCount) this.searchListNum = 1;

    this.view.changeInputValue(this.searchListNum);
    this.searchListNum++;
  }

  chooseWordUpside() {
    if (this.searchListNum < 1) this.searchListNum = this.$popupMenuList.childElementCount;
    this.view.changeInputValue();
    this.searchListNum--;
  }
}
