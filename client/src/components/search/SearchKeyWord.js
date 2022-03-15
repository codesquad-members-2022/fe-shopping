export const SearchKeyWord = data => {
  return /* html */ `
    <div class="l-flex main-header__bottom-search-keyword">
        ${data.reduce((prev, cur) => {
          return (prev += `<a href="#" class="main-header__bottom-search--link">${cur.keyword}</a>`);
        }, '')}
    </div>
    `;
};
