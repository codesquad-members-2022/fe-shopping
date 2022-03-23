import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector, findRefinedData } from "./util.js";
import { FocusBlurEvent } from "./FocusBlurEvent";
import { ClickEvent } from "./ClickEvent";
import { KeyupEvent } from "./KeyupEvent";
import { MouseEvent } from "./MouseEvent";
import { async } from "regenerator-runtime";

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerFilter = selector(".center-filter-btn");
const centerFilterList = selector(".center-filter-list");
const centerFilterParentName = ".center-filter";
const categoriesBtn = selector(".categories-btn");
const categoriesList = selector(".categories-list");

const handleSearchBoxEvent = (target, transformer) => {
  const searchBoxFocusBlur = new FocusBlurEvent(target, transformer);
  const searchBoxKeyup = new KeyupEvent(target, transformer);
  const searchBoxMouse = new MouseEvent(target, transformer);
  searchBoxFocusBlur.init();
  searchBoxMouse.getListMarkEvent();
  searchBoxKeyup.init();
};
const handleCenterFilterEvent = (target, transformer, parentName) => {
  const centerFilterclick = new ClickEvent(target, transformer, parentName);
  const centerFilterMouse = new MouseEvent(target, transformer);
  centerFilterclick.init();
  centerFilterMouse.getListMarkEvent();
};
const handleCategoriesEvent = async (target, tranformer) => {
  const categoriesData = await findRefinedData("categories");
  const categoriesMouse = new MouseEvent(target, tranformer, categoriesData);
  categoriesMouse.getShowEvent();
  categoriesMouse.getListMarkEvent();
};

const init = async () => {
  handleSearchBoxEvent(centerSearchInput, centerRelativeInfo);
  handleCenterFilterEvent(
    centerFilter,
    centerFilterList,
    centerFilterParentName
  );
  await handleCategoriesEvent(categoriesBtn, categoriesList);
};
init();
