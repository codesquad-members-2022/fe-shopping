import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { async } from "regenerator-runtime";
import { selector } from "./util.js";

import CenterFilterView from "./views/CenterFilterView";
import SearchBoxView from "./views/searchBoxView";
import CategoriesView from "./views/CategoriesView";
import ListModel from "./models/ListModel";
import CategoriesModel from "./models/categoriesModel";
import CenterFilterPresenter from "./presenters/CenterFilterPresenter";
import SearchBoxPresenter from "./presenters/SearchBoxPresenter";
import CategoriesPresenter from "./presenters/CategoriesPresenter";

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
const handleCategoriesEvent = async (target, transformer) => {
  const categoriesView = new CategoriesView(target, transformer);
  const categoriesModel = new CategoriesModel();
  const categoriesPresenter = new CategoriesPresenter(categoriesView);
  await categoriesModel.findData("categories");
  categoriesPresenter.setModel(categoriesModel);
  categoriesView.registerWith(categoriesPresenter);
  categoriesView.addEventHandler();
};

const init = async () => {
  handleSearchBox(centerSearchInput, centerRelativeInfo);
  handleCenterFilter(centerFilterBtn, centerFilterList);
  handleCategoriesEvent(categoriesBtn, categoriesList);
};

init();
