import { $, checkElementClass } from '../utils/util.js';

export const rootEvent = () => {
  document.body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.search-list');

    if (selectListBox && checkElementClass({ target, checkClasses: ['search-selectBox', 'search--allBtn'] })) {
      return;
    } else {
      const selectSearchCategoryBox = $('.search-selectBox');
      selectListBox?.remove();
      selectSearchCategoryBox.classList.remove('search--on');
      selectSearchCategoryBox.classList.add('search--off');
    }
  });

  document.body.addEventListener('mouseover', ({ target }) => {
    const categoryListBox = $('.category-list');
    if (categoryListBox && checkElementClass({ target, checkClasses: ['category', 'category-item', 'category--text'] }))
      return;
    else categoryListBox?.remove();
  });
};
