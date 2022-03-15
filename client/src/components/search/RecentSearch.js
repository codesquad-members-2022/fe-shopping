export const RecentSearch = recentWords => {
  return /* html */ `
        <div class="search-recent">
            <header class="search-recent__header">최근 검색어</header>
                <div class="l-flex search-recent__contents">
                    ${recentWords.reduce((prev, cur) => {
                      return (prev += `<a href="#" class="search-recent__link">${cur}</a>`);
                    }, '')}
                </div>
            <footer class="r-flex search-recent__footer">
                    <span class="search-recent--remove">전체삭제</span>
                    <span class="search-recent--off">최근검색어끄기</span>
            </footer>
        </div>
  `;
};
