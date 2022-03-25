import { $, checkElementClass } from '../utils/util.js';

export const rootEvent = () => {
  document.body.addEventListener('click', ({ target }) => {
    const selectListBox = $('.search-list');
    const searchKeywordBox = $('.search-keyword');
    const searchRecentBox = $('.search-recent');

    if (selectListBox && checkElementClass({ target, checkClasses: ['search-selectBox', 'search--allBtn'] })) {
      return;
    } else {
      const selectSearchCategoryBox = $('.search-selectBox');
      selectListBox?.remove();
      selectSearchCategoryBox.classList.remove('search--on');
      selectSearchCategoryBox.classList.add('search--off');
    }

    if (
      searchKeywordBox &&
      checkElementClass({ target, checkClasses: ['search-keyword', 'main-header__input', 'main-header__input--btn'] })
    ) {
      return;
    } else {
      searchKeywordBox?.remove();
    }

    if (
      searchRecentBox &&
      checkElementClass({ target, checkClasses: ['search-recent', 'main-header__input', 'main-header__input--btn'] })
    ) {
      return;
    } else {
      searchRecentBox?.remove();
    }
  });

  document.body.addEventListener('mouseover', ({ target }) => {
    const categoryListBox = $('.main-category-list');
    if (
      categoryListBox &&
      checkElementClass({
        target,
        checkClasses: ['main-category', 'main-category-item', 'main-category-item__link', 'main-category--text'],
      })
    )
      return;
    else {
      categoryListBox?.remove();
    }
  });
};
