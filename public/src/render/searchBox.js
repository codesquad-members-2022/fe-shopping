const renderRecentSearchBox = (parentNode) => {
  parentNode.innerHTML += /* html */ `
    <div class="recent-search-word-container">최근검색어</div>
    <ul class="recent-search-list">
    </ul>
    <div class="recent-search-footer">
      <div class="recent-search-delete-button">전체삭제</div>
      <div class="flexbox-blank"></div>
      <div class="recent-search-onoff-button">최근검색어끄기</div>
    </div>
  `;
};
const renderRelatedSearchBox = (parentNode) => {
  parentNode.innerHTML += /* html */ `
  <ul class="related-search-word-container">
  </ul>
  `;
};

const renderRelatedSearchWord = (parentNode, word) => {
  parentNode.innerHTML += /* html */ `
  <li class="related-search-word">${word}</li>
  `;
};

export { renderRecentSearchBox, renderRelatedSearchBox, renderRelatedSearchWord };
