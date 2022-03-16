const Keyword = (currentWord, keyword) => {
  const currentWordArr = Array.from(currentWord);
  const keywordArr = Array.from(keyword);

  return /* html */ `
        <a href="#" class="main-header__search--link">
          ${keywordArr.reduce((prev, cur, index) => {
            return (prev +=
              currentWordArr[index] === keywordArr[index]
                ? `<strong class="main-header__search--same">${cur}</strong>`
                : `<span>${cur}</span>`);
          }, '')}
        </a>`;
};

export const SearchKeyWord = (currentWord, data) => {
  return /* html */ `
    <div class="l-flex main-header__search-keyword">
        ${data.reduce((prev, cur) => {
          return (prev += Keyword(currentWord, cur.keyword));
        }, '')}
    </div>
    `;
};
