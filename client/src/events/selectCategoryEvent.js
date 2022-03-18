import { $, delay, toggleClass } from '../utils/util.js';
import { SearchCategory } from '../components/search/SearchCategory.js';
import { mainCategory } from '../components/category/mainCategory.js';
import { searchCategoryData, mainCategoryData } from '../constants/data.js';

export const selectCategoryEvent = () => {
  const selectCategoryBox = $('.category');
  const selectSearchCategoryBox = $('.search-selectBox');

  selectCategoryBox.addEventListener('mouseover', () => {
    // categroySelectBox 보여주기
    const categoryListBox = $('.category-list');
    if (categoryListBox) return;
    selectCategoryBox.insertAdjacentHTML('beforeend', mainCategory(mainCategoryData));
  });

  selectSearchCategoryBox.addEventListener('click', async ({ target }) => {
    // selectListBox : 카테고리 메뉴 Ul 영역
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
      await delay(1);
      toggleClass($('.search-list'), 'heightExpanded');
    } else {
      toggleClass($('.search-list'), 'heightExpanded');
      // await delay(1000);
      // selectSearchCategoryBox.removeChild(selectListUlBox);
      toggleClass(selectSearchCategoryBox, 'search--off search--on');
    }
  });
};
