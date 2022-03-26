import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector, findRefinedData } from "./util.js";
import { FocusBlurEvent } from "./FocusBlurEvent";
import { KeyupEvent } from "./KeyupEvent";
import { MouseEvent } from "./MouseEvent";
import { async } from "regenerator-runtime";
import { CenterFilterPresenter } from "./presenters/centerFilterPresenter";
import { CenterFilterView } from "./views/centerFilterView";

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerFilterBtn = selector(".center-filter-btn");
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
const handleCenterFilterEvent = (target, transformer) => {
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
  handleSearchBoxEvent(centerSearchInput, centerRelativeInfo);
  handleCenterFilterEvent(
    centerFilterBtn,
    centerFilterList,
    centerFilterParentName
  );
  await handleCategoriesEvent(categoriesBtn, categoriesList);
};
init();
