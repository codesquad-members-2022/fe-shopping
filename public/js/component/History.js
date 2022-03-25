import { $ } from '../util.js';

export class History {
  constructor() {
    this.$searchInput = $('.search-form-input');
    this.$autocompleteBox = $('.autocomplete-popup');
    this.$historyPopupBox = $('.history-popup');
    this.$historyPopupBtn = $('.history-popup-btn');
    this.$deleteAllHistory = $('.delete-all-history');
    this.$historyOnoff = $('.history-onoff');
    this.historyList = new Array();
    this.savedHistory = JSON.parse(localStorage.getItem('history'));
  }

  showHistory(element) {
    const list = document.createElement('li');
    list.innerText = element;
    this.$historyPopupBox.appendChild(list);
  }

  showInitialHistory() {
    console.log('함수 실행됨');
    // localStorage에 있는 검색어를 띄운다
    if (this.savedHistory !== null) {
      this.historyList = this.savedHistory;
      this.savedHistory.forEach((element) => this.showHistory(element));
    }
  }

  getInput() {
    const currentInput = this.$searchInput.value;
    return currentInput;
  }

  deleteHistory() {
    localStorage.clear();
  }

  setHistoryListener() {
    this.$searchInput.addEventListener('focus', ({ target }) => {
      this.$historyPopupBox.classList.add('showHistoryPopup');
      this.$historyPopupBtn.classList.add('showHistoryPopup');
    });
    this.showInitialHistory();

    this.$deleteAllHistory.addEventListener('click', ({ target }) => {
      this.deleteHistory();
      this.$historyPopupBox.innerHTML = `<h3>최근 검색어</h3>`;
    });

    this.$historyOnoff.addEventListener('click', ({ target }) => {
      this.$searchInput.classList.toggle('historyOn');
      if (!this.$searchInput.classList.contains('historyOn')) {
        this.$historyPopupBox.innerHTML = `<span>최근 검색어 저장 기능이 꺼져 있습니다.</span>`;
        this.$historyOnoff.innerText = `최근검색어켜기`;
      } else {
        this.$historyPopupBox.innerHTML = `<h3>최근 검색어</h3>`;
        this.showInitialHistory();
        this.$historyOnoff.innerText = `최근검색어끄기`;
      }
    });

    this.$searchInput.addEventListener('keypress', (key) => {
      this.$autocompleteBox.classList.remove('showAutocomplete');
      if (key.keyCode === 13) {
        if (!this.$searchInput.classList.contains('historyOn')) return;

        const input = this.getInput();
        this.historyList.push(input);
        localStorage.setItem('history', JSON.stringify(this.historyList));
        this.showHistory(input);
      }
    });
  }
}
