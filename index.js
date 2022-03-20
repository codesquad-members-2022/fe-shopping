import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import SearchCategory from "./components/SearchCategory.js";
import SearchBar from "./components/SearchBar.js";
import SearchCategoryDropBox from "./components/SearchCategoryDropBox.js";
import SearchBarDropBox from "./components/SearchBarDropBox.js";

const category = new SearchCategory();
const categoriesDropBox = new SearchCategoryDropBox();
category.handleClickSearchCategory();
categoriesDropBox.handleClickSearchCategory();
categoriesDropBox.appendElement({ data: searchCategories });

const searchBar = new SearchBar();
const searchBarDropBox = new SearchBarDropBox();
searchBarDropBox.appendElement({ data: searchData });
searchBarDropBox.handleClickDocumentWhenDropDown();

searchBar.handleFocusInput({
  dropDown: (hasDropBox) => {
    if (hasDropBox) {
      searchBarDropBox.render();
    }
  },
});

carousel();
