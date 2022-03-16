import { $, handleHeightBottomAnimate, handleHeightTopAnimate } from '../utils/util.js';
import { SearchCategory } from '../components/search/SearchCategory.js';
import { searchCategoryData } from '../constants/data.js';

export const selectCategoryEvent = () => {
  const selectCategoryBox = $('.main-header__category');
  const selectSearchCategoryBox = $('.main-header__search-selectBox');

  selectCategoryBox.addEventListener('mouseover', () => {
    // categroySelectBox 보여주기
  });

  selectCategoryBox.addEventListener('mouseout', () => {
    // categroySelectBox 가 열려있으면 닫히게 하자
  });

  selectSearchCategoryBox.addEventListener('click', ({ target }) => {
    // selectListBox : 카테고리 메뉴 Ul 영역
    const selectListUlBox = $('.main-header__search-list');

    if (target.classList.contains('main-header__search-searchItem')) {
      const dataId = target.getAttribute('data-id');
      const allBtn = $('.main-header__search--allBtn');
      allBtn.innerText = searchCategoryData[dataId];
      return;
    }

    if (selectListUlBox === null) {
      selectSearchCategoryBox.insertAdjacentHTML('beforeend', SearchCategory(searchCategoryData));
      selectSearchCategoryBox.classList.remove('main-header__search--off');
      selectSearchCategoryBox.classList.add('main-header__search--on');

      handleHeightBottomAnimate({
        start: 0,
        value: 100,
        element: $('.main-header__search-list'),
        height: 2000,
      });
    } else {
      handleHeightTopAnimate({
        start: parseInt(getComputedStyle(selectListUlBox).maxHeight),
        value: -200,
        element: $('.main-header__search-list'),
        parentElement: $('.main-header__search-selectBox'),
        height: 0,
      });

      selectSearchCategoryBox.classList.remove('main-header__search--on');
      selectSearchCategoryBox.classList.add('main-header__search--off');
    }
  });
};
