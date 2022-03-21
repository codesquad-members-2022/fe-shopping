import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector } from "./util.js";
import { FocusBlurEvent } from "./FocusBlurEvent";
import { ClickEvent } from "./ClickEvent";
import { KeyupEvent } from "./KeyupEvent";
import { MouseEvent } from "./MouseEvent";

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerFilter = selector(".center-filter-btn");
const centerFilterList = selector(".center-filter-list");
const centerFilterParentName = ".center-filter";

const handleSearchBoxEvent = (target, transformer) => {
  const searchBoxFocusBlur = new FocusBlurEvent(target, transformer);
  const searchBoxKeyup = new KeyupEvent(target, transformer);
  const searchBoxMouse = new MouseEvent(target, transformer);
  searchBoxFocusBlur.init();
  searchBoxMouse.init();
  searchBoxKeyup.init();
};
const handleCenterFilterEvent = (target, transformer, parentName) => {
  const centerFilterclick = new ClickEvent(target, transformer, parentName);
  const centerFilterMouse = new MouseEvent(target, transformer);
  centerFilterclick.init();
  centerFilterMouse.init();
};

handleSearchBoxEvent(centerSearchInput, centerRelativeInfo);
handleCenterFilterEvent(centerFilter, centerFilterList, centerFilterParentName);
