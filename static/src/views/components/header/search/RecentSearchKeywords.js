export class RecentSearchKeywords {
  constructor([STORAGE_KEY, searchStorage]) {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$recentKeywords = this.$searchWrap.querySelector('.search-recent-keywords');
    this.STORAGE_KEY = STORAGE_KEY;
    this.searchStorage = searchStorage;
    this.render();
    this.addAllDeleteButton();
  }

  render() {
    this.$recentKeywords.querySelector('ol').innerHTML = '';
    const recentKeywordsData = this.searchStorage.getItem(this.STORAGE_KEY);
    if (!recentKeywordsData) return;
    const recentKeywordsTemplate = recentKeywordsData
      .split(',')
      .map(
        (keyword) => `<li>
                        <a href="javascript:;"><span>${keyword}</span></a>
                        <button type="button" class="delete-button">삭제</button>
                      </li>`
      )
      .join('');
    this.$recentKeywords.querySelector('ol').insertAdjacentHTML('afterbegin', recentKeywordsTemplate);
  }

  addAllDeleteButton() {
    this.$recentKeywords.querySelector('.all-delete-button').addEventListener('click', () => {
      this.searchStorage.removeItem(this.STORAGE_KEY);
      this.$recentKeywords.classList.remove('active');
      this.render();
    });
  }
}
