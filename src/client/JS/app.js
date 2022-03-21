import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector } from "./util.js";
import { FocusBlur } from "./focusBlur";
import { SearchBoxKeyup } from "./SearchBox/SearchBoxKeyup";
import { SearchBoxMouse } from "./SearchBox/SearchBoxMouse";

const searchInput = selector("input", selector(".center-search"));
const relativeInfo = selector(".center-relative-info");
const categoriesBtn = selector(".categories-btn");
const categoriesList = selector(".categories-list");

const handleSearchBoxEvent = (target, transformer) => {
  const searchBoxFocusBlur = new FocusBlur(target, transformer);
  const searchBoxKeyup = new SearchBoxKeyup(target, transformer);
  const searchBoxMouse = new SearchBoxMouse(target, transformer);
  searchBoxFocusBlur.init();
  searchBoxMouse.init();
  searchBoxKeyup.init();
};

const handleCategoriesEvent = (target, transformer) => {
  const categoriesFocusBlur = new FocusBlur(target, transformer);
  categoriesFocusBlur.init();
};

handleSearchBoxEvent(searchInput, relativeInfo);
handleCategoriesEvent(categoriesBtn, categoriesList);
