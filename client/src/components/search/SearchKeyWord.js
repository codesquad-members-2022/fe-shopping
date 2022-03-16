export const SearchKeyWord = data => {
  return /* html */ `
    <div class="l-flex main-header__search-keyword">
        ${data.reduce((prev, cur) => {
          return (prev += `<a href="#" class="main-header__search--link">${cur.keyword}</a>`);
        }, '')}
    </div>
    `;
};
