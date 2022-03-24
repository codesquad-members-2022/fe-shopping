import category from "../../testData/categoryData.js";
import CategoryList from "./CategoryList.js";
import CategorySelector from "./CategorySelector.js";
import SearchController from "./SearchController.js";
import SearchResultList from "./SearchResultList.js";

const searchBarRender = () => {
    const $search = document.querySelector('.search');
    const categoryList = new CategoryList(category);
    const searchResultList = new SearchResultList();
    const categorySelector = new CategorySelector($search, categoryList, category);
    const searchController = new SearchController($search, searchResultList);
    categorySelector.init();
    searchController.init();
};

const renderHeader = () => {
    searchBarRender();
}

export default renderHeader;