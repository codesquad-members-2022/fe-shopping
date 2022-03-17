export class RecentSearchKeywords {
  constructor([RECENT_SEARCH_KEYWORDS, searchStorage]) {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$recentKeywords = this.$searchWrap.querySelector('.search-recent-keywords');
    this.RECENT_SEARCH_KEYWORDS = RECENT_SEARCH_KEYWORDS;
    this.searchStorage = searchStorage;
    this.render();
    this.addEventListener();
  }

  render() {
    this.$recentKeywords.querySelector('ol').innerHTML = '';
    const recentKeywordsData = this.searchStorage.getItem(this.RECENT_SEARCH_KEYWORDS);
    if (!recentKeywordsData) return;
    const recentKeywordsTemplate = recentKeywordsData
      .split(',')
      .map(
        (keyword, idx) => `<li>
                        <a href="javascript:;" class="${idx === 0 ? 'active' : ''}"><span>${keyword}</span></a>
                        <button type="button" class="delete-button">삭제</button>
                      </li>`
      )
      .join('');
    this.$recentKeywords.querySelector('ol').insertAdjacentHTML('afterbegin', recentKeywordsTemplate);
  }

  addAllDeleteButtonEvent() {
    this.$recentKeywords.querySelector('.all-delete-button').addEventListener('click', () => {
      this.searchStorage.removeItem(this.RECENT_SEARCH_KEYWORDS);
      this.$recentKeywords.classList.remove('active');
      this.render();
    });
  }

  addSwitchButtonEvent() {
    this.$recentKeywords.querySelector('.switch-button').addEventListener('click', () => {
      this.$recentKeywords.classList.remove('active');
    });
  }

  addEventListener() {
    this.addAllDeleteButtonEvent();
    this.addSwitchButtonEvent();
  }
}
