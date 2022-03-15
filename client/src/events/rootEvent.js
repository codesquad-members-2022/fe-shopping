import { $ } from '../utils/util.js';

export const rootEvent = () => {
  const body = $('body');
  body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.main-header__bottom-search-list');
    const selectSearchCategoryBox = $('.main-header__bottom-search-selectBox');

    if (
      (selectListBox && target.classList.contains('main-header__bottom-search--allBtn')) ||
      (selectListBox && target.classList.contains('main-header__bottom-search-selectBox'))
    ) {
      return;
    } else {
      selectListBox?.remove();
      selectSearchCategoryBox.classList.remove('main-header__bottom-search--on');
      selectSearchCategoryBox.classList.add('main-header__bottom-search--off');
    }
  });
};
