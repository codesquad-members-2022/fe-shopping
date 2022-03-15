import { $, handleHeightBottomAnimate, handleHeightTopAnimate } from '../utils/util.js';
import { SearchCategory } from '../components/search/SearchCategory.js';
import { searchCategoryData } from '../constants/data.js';

export const selectCategoryEvent = () => {
  const selectCategoryBox = $('.main-header__bottom-category');
  const selectSearchCategoryBox = $('.main-header__bottom-search-selectBox');

  selectCategoryBox.addEventListener('mouseover', () => {
    // categroySelectBox 보여주기
  });

  selectCategoryBox.addEventListener('mouseout', () => {
    // categroySelectBox 가 열려있으면 닫히게 하자
  });

  selectSearchCategoryBox.addEventListener('click', ({ target }) => {
    // selectListBox : 카테고리 메뉴 Ul 영역
    const selectListUlBox = $('.main-header__bottom-search-list');

    if (target.classList.contains('main-header__bottom-search-searchItem')) {
      const dataId = target.getAttribute('data-id');
      const allBtn = $('.main-header__bottom-search--allBtn');
      allBtn.innerText = searchCategoryData[dataId];
      return;
    }

    if (selectListUlBox === null) {
      selectSearchCategoryBox.insertAdjacentHTML('beforeend', SearchCategory(searchCategoryData));
      selectSearchCategoryBox.classList.remove('main-header__bottom-search--off');
      selectSearchCategoryBox.classList.add('main-header__bottom-search--on');

      handleHeightBottomAnimate({
        start: 0,
        value: 100,
        element: $('.main-header__bottom-search-list'),
        height: 2000,
      });
    } else {
      handleHeightTopAnimate({
        start: parseInt(getComputedStyle(selectListUlBox).maxHeight),
        value: -200,
        element: $('.main-header__bottom-search-list'),
        parentElement: $('.main-header__bottom-search-selectBox'),
        height: 0,
      });

      selectSearchCategoryBox.classList.remove('main-header__bottom-search--on');
      selectSearchCategoryBox.classList.add('main-header__bottom-search--off');
    }
  });
};
