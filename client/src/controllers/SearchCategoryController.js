import SearchCategoryView from '../views/search/SearchCategoryView.js';
import { $, timeDelay, toggleClass } from '../utils/util.js';
import { searchCategoryData } from '../constants/data.js';
import { CategoryModel } from '../models/CategoryModel.js';

export class SearchCategoryController {
  constructor() {
    this.SearchCategoryView = new SearchCategoryView();
    this.categoryModel = new CategoryModel();
    this.SearchCategoryView.clickedAnimation = this.clickedAnimation.bind(this);

    this.SearchCategoryView.run();
  }

  async clickedAnimation({ target }) {
    const dataId = target.getAttribute('data-category-id');
    this.categoryModel.save(searchCategoryData);
    const localCategoryData = this.categoryModel.getCategoryData();

    if (dataId) {
      const allBtn = $('.search--allBtn');
      allBtn.innerText = localCategoryData[dataId];
    }

    const selectListUlBox = $('.search-list');
    if (selectListUlBox === null) {
      this.SearchCategoryView.searchCategoryElement.insertAdjacentHTML(
        'beforeend',
        this.SearchCategoryView.drawCategoryList(localCategoryData)
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
