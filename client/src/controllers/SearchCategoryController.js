import SearchCategoryView from '../views/search/SearchCategoryView.js';
import { $, timeDelay, toggleClass } from '../utils/util.js';
import { searchCategoryData } from '../constants/data.js';

export class SearchCategoryController {
  constructor() {
    this.SearchCategoryView = new SearchCategoryView();
    this.SearchCategoryView.clickedAnimation = this.clickedAnimation.bind(this);

    this.SearchCategoryView.run();
  }

  async clickedAnimation({ target }) {
    // 아래 코드 수정 필요.
    const selectListUlBox = $('.search-list');
    if (target.classList.contains('search-item')) {
      const dataId = target.getAttribute('data-id');
      const allBtn = $('.search--allBtn');
      allBtn.innerText = searchCategoryData[dataId];
      return;
    }

    if (selectListUlBox === null) {
      this.SearchCategoryView.searchCategoryElement.insertAdjacentHTML(
        'beforeend',
        this.SearchCategoryView.drawCategoryList(searchCategoryData)
      );
      toggleClass(this.SearchCategoryView.searchCategoryElement, 'search--off search--on');
      await timeDelay(1);
      toggleClass($('.search-list'), 'heightExpanded');
    } else {
      toggleClass($('.search-list'), 'heightExpanded');
      toggleClass(this.SearchCategoryView.searchCategoryElement, 'search--off search--on');
    }
  }
}
