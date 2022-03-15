export const SearchCategory = data => {
  return /* html */ `
        <ul class="main-header__bottom-search-list">
          ${data.reduce((prev, cur, index) => {
            return (prev += `<li class="main-header__bottom-search-searchItem" data-id=${index}>${cur}</li>`);
          }, '')}
        </ul>
    `;
};
