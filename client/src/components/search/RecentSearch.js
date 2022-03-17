import { SearchKeyWord } from './SearchKeyWord.js';

export const RecentSearch = recentWords => {
  return /* html */ `
        <div class="search-recent">
            <header class="search-recent__header">최근 검색어</header>
            <div class="search-recent__contents">
                ${SearchKeyWord('', recentWords)}
            </div>
            <footer class="r-flex search-recent__footer">
                <span class="search-recent--remove">전체삭제</span>
                <span class="search-recent--off">최근검색어끄기</span>
            </footer>
        </div>
  `;
};
