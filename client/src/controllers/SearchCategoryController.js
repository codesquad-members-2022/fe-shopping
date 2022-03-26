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
    const dataId = target.getAttribute('data-category-id');
    if (dataId) {
      const allBtn = $('.search--allBtn');
      allBtn.innerText = searchCategoryData[dataId];
    }

    const selectListUlBox = $('.search-list');
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
