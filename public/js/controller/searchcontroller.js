import SearchModel from '../model/searchmodel.js';
import SearchCategoryView from '../view/searchcategoryview.js';

export default class SearchController {
  constructor() {
    this.searchModel = new SearchModel();
    this.searchCategoryView = new SearchCategoryView();
  }

  init() {
    this.searchCategoryView.init('.search-category');
    this.setUp();
  }

  setUp() {
    this.deliverSearchCategoryData();
  }

  async deliverSearchCategoryData() {
    const data = await this.searchModel.fetchSearchData('category/data');
    this.searchCategoryView.parseSearchCategoryData(data);
  }
}
