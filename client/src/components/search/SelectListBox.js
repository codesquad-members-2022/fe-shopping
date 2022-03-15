import { category } from '../../constants/data.js';

export const SelectListBox = () => {
  return /* html */ `
        <ul class="main-header__bottom-search-list">
          ${category.reduce((prev, cur, index) => {
            return (prev += `<li class="main-header__bottom-search-searchItem" data-id=${index + 1}>${cur}</li>`);
          }, '')}
        </ul>
    `;
};
