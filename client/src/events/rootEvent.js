import { $ } from '../utils/util.js';

export const rootEvent = () => {
  const body = $('body');
  body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.search-list');
    const selectSearchCategoryBox = $('.search-selectBox');

    if (
      (selectListBox && target.classList.contains('search--allBtn')) ||
      (selectListBox && target.classList.contains('search-selectBox'))
    ) {
      return;
    } else {
      selectListBox?.remove();
      selectSearchCategoryBox.classList.remove('search--on');
      selectSearchCategoryBox.classList.add('search--off');
    }
  });
};
