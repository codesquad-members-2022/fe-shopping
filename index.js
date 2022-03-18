import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import SearchCategory from "./components/SearchCategory.js";
import SearchBar from "./components/SearchBar.js";

const category = new SearchCategory();
category.appendElement({ data: searchCategories });
category.handleClickSearchCategory();
category.render();

const searchBar = new SearchBar();
searchBar.appendElement({ data: searchData });
searchBar.handleFocusInput();
searchBar.handleClickWhenDropDown();
searchBar.render();

carousel();
