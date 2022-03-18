import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import SearchCategory from "./components/SearchCategory.js";
import SearchBar from "./components/SearchBar.js";
import CategoriesDropBox from "./components/CategoriesDropBox.js";

const category = new SearchCategory();
const categoriesDropBox = new CategoriesDropBox();
category.handleClickSearchCategory();
categoriesDropBox.handleClickSearchCategory();
categoriesDropBox.appendElement({ data: searchCategories });

const searchBar = new SearchBar();
searchBar.appendElement({ data: searchData });
searchBar.handleFocusInput();
searchBar.handleClickWhenDropDown();
searchBar.render();

carousel();
