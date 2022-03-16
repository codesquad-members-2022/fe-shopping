export const SearchCategory = data => {
  return /* html */ `
        <ul class="main-header__search-list">
          ${data.reduce((prev, cur, index) => {
            return (prev += `<li class="main-header__search-searchItem" data-id=${index}>${cur}</li>`);
          }, '')}
        </ul>
    `;
};
