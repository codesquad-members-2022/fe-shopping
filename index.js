import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import SearchCategory from "./components/SearchCategory.js";
import SearchBar from "./components/SearchBar.js";

const category = new SearchCategory();
category.setState("전체");
category.createElement({ data: searchCategories });
category.handleClickSearchCategory();
category.render();

const searchBar = new SearchBar();
searchBar.createElement({ data: searchData });
searchBar.handleFocusInput();
searchBar.handleClickWhenDropDown();
searchBar.render();

carousel();
