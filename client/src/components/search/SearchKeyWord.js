const Keyword = (currentWord, keyword, id) => {
  const currentWordArr = Array.from(currentWord);
  const keywordArr = Array.from(keyword);

  return /* html */ `
        <a href="#" class="search--link text-none" data-id="${id}">
          ${keywordArr.reduce((prev, cur, index) => {
            return (prev +=
              currentWordArr[index] === keywordArr[index]
                ? `<strong class="search--same">${cur}</strong>`
                : `<span>${cur}</span>`);
          }, '')}
        </a>`;
};

export const SearchKeyWord = (currentWord, data) => {
  return /* html */ `
    <div class="l-flex search-keyword">
        ${data.reduce((prev, cur, index) => {
          return (prev += Keyword(currentWord, cur, index));
        }, '')}
    </div>
    `;
};
