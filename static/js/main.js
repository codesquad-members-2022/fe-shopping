import {SearchBarController} from './controller/searchBarController.js';
import {SearchCategoryView} from './view/searchCategoryView.js'
import {fetchData} from './util/util.js';

const data = await fetchAllData();
init();

async function fetchAllData() {
  const [categoryListData, categoryImageData, goodsData] = await Promise.all([
    fetchData('categoryListData'), fetchData('categoryImageData'), fetchData('goodsData')
  ]);
  const firstKeyword = '아';
  const data = {
    categoryList: categoryListData,
    categoryImage: categoryImageData,
    goodsKeyword: goodsData[firstKeyword]
  }
  return data;
}

function init() {
  const searchCategoryView = new SearchCategoryView();
  const searchBarController = new SearchBarController(data.goodsKeyword);
  searchCategoryView.init();
  searchBarController.init();
}
