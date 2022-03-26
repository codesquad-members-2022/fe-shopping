import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { async } from "regenerator-runtime";
import { selector, findRefinedData } from "./util.js";
import { MouseEvent } from "./MouseEvent";
import CenterFilterView from "./views/CenterFilterView";
import SearchBoxView from "./views/searchBoxView";
import ListModel from "./models/ListModel";
import CenterFilterPresenter from "./presenters/CenterFilterPresenter";
import SearchBoxPresenter from "./presenters/SearchBoxPresenter";

const centerSearchInput = selector(".center-search-input");
const centerRelativeInfo = selector(".center-relative-info");
const centerFilterBtn = selector(".center-filter-btn");
const centerFilterList = selector(".center-filter-list");
const categoriesBtn = selector(".categories-btn");
const categoriesList = selector(".categories-list");

const handleSearchBox = (target, transformer) => {
  const searchBoxView = new SearchBoxView(target, transformer);
  const listModel = new ListModel();
  const searchBoxPresenter = new SearchBoxPresenter(searchBoxView);
  searchBoxPresenter.setModel(listModel);
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
