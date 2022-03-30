import SearchModel from '../model/searchmodel.js';
import SearchCategoryView from '../view/searchcategoryview.js';
import SearchRecentView from '../view/searchrecentview.js';

export default class SearchController {
  constructor() {
    this.searchModel = new SearchModel();
    this.searchCategoryView = new SearchCategoryView();
    this.searchRecentView = new SearchRecentView();
  }

  init() {
    this.searchCategoryView.init('.search-category');
    this.searchRecentView.init('.search-recent');
    this.setUp();
  }

  setUp() {
    this.deliverSearchCategoryData();
  }

  async deliverSearchCategoryData() {
    const data = await this.searchModel.fetchSearchData('category/data');
    this.searchCategoryView.parseSearchCategoryData(data);
  }

  // async deliverSearchCategoryData() {
  //   const data = await this.searchModel.fetchSearchData('input/ah/data');
  //   this.searchCategoryView.parseSearchCategoryData(data);
  // }

  // async deliverSearchCategoryData() {
  //   const data = await this.searchModel.fetchSearchData('input/eeung/data');
  //   this.searchCategoryView.parseSearchCategoryData(data);
  // }
}
