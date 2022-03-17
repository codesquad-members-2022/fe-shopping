export class RecentSearch {
  constructor() {
    this.text;
    this.localStorageCnt = 0;
    this.data = [];
  }

  createRecentSearch() {
    const searchText = document.querySelector('.search-text');
    const recentSearch = document.querySelector('.search-recent');

    searchText.addEventListener('focus', () => {
      recentSearch.style.visibility = 'visible';
      this.loadData();
      this.parseData();
    });
  }

  destroyRecentSearch() {
    const searchText = document.querySelector('.search-text');
    const recentSearch = document.querySelector('.search-recent');

    searchText.addEventListener('blur', () => {
      recentSearch.style.visibility = 'hidden';
    });

    searchText.addEventListener('input', () => {
      recentSearch.style.visibility = 'hidden';
    });
  }

  inputData() {
    const searchText = document.querySelector('.search-text');

    searchText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.text = searchText.value;
        this.saveData();
      }
    });
  }

  saveData() {
    localStorage.setItem(`${this.localStorageCnt}`, this.text);
    this.localStorageCnt++;
  }

  loadData() {
    for (
      let localStorageIndex = 0;
      localStorageIndex < this.localStorageCnt;
      localStorageIndex++
    )
      this.data.push(localStorage.getItem(`${localStorageIndex}`));
  }

  parseData() {
    document.querySelector;
    const dataOverlapDeletion = new Set([...this.data]);

    const list = document.createElement('div');
    dataOverlapDeletion.forEach((e) => {
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="search-recent__item">
          <a href="#" class="search-recent__link">${e}</a>
          </li>`
      );
    });

    const recentList = document.querySelector('.search-recent__list');
    recentList.innerHTML = list.innerHTML;
  }
}
