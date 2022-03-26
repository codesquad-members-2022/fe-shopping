import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { async } from "regenerator-runtime";
import { selector, findRefinedData } from "./util.js";
import { KeyupEvent } from "./KeyupEvent";
import { MouseEvent } from "./MouseEvent";
import { CenterFilterPresenter } from "./presenters/CenterFilterPresenter";
import CenterFilterView from "./views/CenterFilterView";
import SearchBoxView from "./views/searchBoxView";
import SearchBoxPresenter from "./presenters/SearchBoxPresenter";

const centerSearchInput = selector(".center-search-input");
const centerRelativeInfo = selector(".center-relative-info");
const centerFilterBtn = selector(".center-filter-btn");
const centerFilterList = selector(".center-filter-list");
const categoriesBtn = selector(".categories-btn");
const categoriesList = selector(".categories-list");

const handleSearchBox = (target, transformer) => {
  const searchBoxKeyup = new KeyupEvent(target, transformer);
  searchBoxKeyup.init();

  const searchBoxView = new SearchBoxView(target, transformer);
  const searchBoxPresenter = new SearchBoxPresenter(searchBoxView);
  searchBoxView.registerWith(searchBoxPresenter);
  searchBoxView.addEventHandler();
};
const handleCenterFilter = (target, transformer) => {
  const centerFilterView = new CenterFilterView(target, transformer);
  const centerFilterPresenter = new CenterFilterPresenter(centerFilterView);
  centerFilterView.registerWith(centerFilterPresenter);
  centerFilterView.addEventHandler();
};
const handleCategoriesEvent = async (target, tranformer) => {
  const categoriesData = await findRefinedData("categories");
  const categoriesMouse = new MouseEvent(target, tranformer, categoriesData);
  categoriesMouse.getShowEvent();
  categoriesMouse.getListMarkEvent();
};

const init = async () => {
  handleSearchBox(centerSearchInput, centerRelativeInfo);
  handleCenterFilter(centerFilterBtn, centerFilterList);
  await handleCategoriesEvent(categoriesBtn, categoriesList);
};

init();
