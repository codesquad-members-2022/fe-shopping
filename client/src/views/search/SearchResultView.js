import { $ } from '../../utils/util.js';
import { SearchKeyWord } from '../../components/search/SearchKeyWord.js';

export class SearchResultView {
  constructor() {
    this.searchResultElement = $('.main-header__resultView');
  }

  showRecentView(recentWords, onRecent) {
    const recentHTML = /* html */ `
        <div class="search-recent">
        ${
          onRecent
            ? `<header class="search-recent__header">최근 검색어</header>
            <div class="search-recent__contents">
                ${SearchKeyWord('', recentWords)}
            </div>`
            : `<div class="r-flex search-recent__contents--off">최근 검색어 저장 기능이 꺼져 있습니다.</div>`
        }
            <footer class="r-flex search-recent__footer">
                <span class="search-recent--remove">전체삭제</span>
                ${
                  onRecent
                    ? `<span class='search-recent--off'>최근검색어끄기</span>`
                    : `<span class='search-recent--on'>최근검색어켜기</span>`
                }
            </footer>
        </div>
  `;
    this.searchResultElement.insertAdjacentHTML('beforeend', recentHTML);
  }

  clearView() {
    this.searchResultElement.innerHTML = '';
  }

  showAutoCompleteView() {}
}
