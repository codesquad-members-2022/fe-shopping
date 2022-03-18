import { fetchAutoCompleteDataEeung } from '../fetch/search-fetch-eeung.js';
import { fetchAutoCompleteDataAh } from '../fetch/search-fetch-ah.js';

export class AutoComplete {
  constructor() {
    this.data;
    this.str = '';
    this.recentSquence = 0;
  }

  createAutoComplete() {
    const searchText = document.querySelector('.search-text');
    const autoComplete = document.querySelector('.search-auto');

    searchText.addEventListener('input', (e) => {
      if (searchText.value === 'ㅇ') this.requestEeungData();
      else if (searchText.value === '아') this.requestAhData();

      this.renderData();
      autoComplete.style.visibility = 'visible';
      this.str += e.data;
    });

    searchText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        console.log(this.recentSquence);
        this.recentSquence < this.data.createAutoComplete.length
          ? this.recentSquence++
          : (this.recentSquence = 0);
      }
      //  else if (e.key === 'ArrowDown') {
      //   this.recentSquence ? (this.recentSquence = 0) : this.recentSquence--;
      // }
    });
  }

  destroyAutoComplete() {
    const searchText = document.querySelector('.search-text');
    const autoComplete = document.querySelector('.search-auto');

    searchText.addEventListener('blur', () => {
      autoComplete.style.visibility = 'hidden';
    });
  }

  async requestEeungData() {
    this.data = await fetchAutoCompleteDataEeung();
  }

  async requestAhData() {
    this.data = await fetchAutoCompleteDataAh();
  }

  renderData() {
    const list = document.createElement('div');

    this.data.autoCompletion.forEach((e) => {
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="search-auto__item">
          <a href="#" class="search-auto__link">${e.keyword}</a>
        </li>`
      );
    });

    const autoList = document.querySelector('.search-auto__list');
    autoList.innerHTML = list.innerHTML;
  }
}
