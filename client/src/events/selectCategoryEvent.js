import { $, timeDelay, toggleClass } from '../utils/util.js';
import { SearchCategory } from '../components/search/SearchCategory.js';
import { mainCategory } from '../components/category/mainCategory.js';
import { searchCategoryData, mainCategoryData } from '../constants/data.js';

export const selectCategoryEvent = () => {
  const selectMainCategoryBox = $('.category');
  const selectSearchCategoryBox = $('.search-selectBox');

  selectMainCategoryBox.addEventListener('mouseover', () => {
    const categoryListBox = $('.category-list');
    if (categoryListBox) {
      return;
    }
    selectMainCategoryBox.insertAdjacentHTML('beforeend', mainCategory(mainCategoryData));
  });

  selectSearchCategoryBox.addEventListener('click', async ({ target }) => {
    const selectListUlBox = $('.search-list');

    if (target.classList.contains('search-item')) {
      const dataId = target.getAttribute('data-id');
      const allBtn = $('.search--allBtn');
      allBtn.innerText = searchCategoryData[dataId];
      return;
    }

    if (selectListUlBox === null) {
      selectSearchCategoryBox.insertAdjacentHTML('beforeend', SearchCategory(searchCategoryData));
      toggleClass(selectSearchCategoryBox, 'search--off search--on');
      await timeDelay(1);
      toggleClass($('.search-list'), 'heightExpanded');
    } else {
      toggleClass($('.search-list'), 'heightExpanded');
      toggleClass(selectSearchCategoryBox, 'search--off search--on');
    }
  });
};
