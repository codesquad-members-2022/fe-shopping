export const SearchCategory = data => {
  return /* html */ `
        <ul class="search-list">
          ${data.reduce((prev, cur, index) => {
            return (prev += `<li class="search-searchItem" data-id=${index}>${cur}</li>`);
          }, '')}
        </ul>
    `;
};
