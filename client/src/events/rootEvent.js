import { $, checkElementClass, toggleClass } from '../utils/util.js';

export const rootEvent = () => {
  document.body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.search-list');
    const selectSearchCategoryBox = $('.search-selectBox');

    if (selectListBox && checkElementClass({ target, checkClasses: ['search-selectBox', 'search--allBtn'] })) {
      return;
    } else {
      selectListBox?.remove();
      // toggleClass(selectSearchCategoryBox, 'search--off search--on');
      selectSearchCategoryBox.classList.remove('search--on');
      selectSearchCategoryBox.classList.add('search--off');
    }
  });
};
