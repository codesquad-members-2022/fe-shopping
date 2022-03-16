import { $ } from '../utils/util.js';

export const rootEvent = () => {
  const body = $('body');
  body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.main-header__search-list');
    const selectSearchCategoryBox = $('.main-header__search-selectBox');

    if (
      (selectListBox && target.classList.contains('main-header__search--allBtn')) ||
      (selectListBox && target.classList.contains('main-header__search-selectBox'))
    ) {
      return;
    } else {
      selectListBox?.remove();
      selectSearchCategoryBox.classList.remove('main-header__search--on');
      selectSearchCategoryBox.classList.add('main-header__search--off');
    }
  });
};
