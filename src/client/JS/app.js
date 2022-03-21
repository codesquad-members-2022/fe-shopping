import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector } from "./util.js";
import { FocusBlur } from "./focusBlur";
import { Click } from "./Click";
import { SearchBoxKeyup } from "./SearchBox/SearchBoxKeyup";
import { SearchBoxMouse } from "./SearchBox/SearchBoxMouse";

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerMenu = selector(".center-menu");
const centerMenuList = selector(".center-menu-list");

const handleSearchBoxEvent = (target, transformer) => {
  const searchBoxFocusBlur = new FocusBlur(target, transformer);
  const searchBoxKeyup = new SearchBoxKeyup(target, transformer);
  const searchBoxMouse = new SearchBoxMouse(target, transformer);
  searchBoxFocusBlur.init();
  searchBoxMouse.init();
  searchBoxKeyup.init();
};

const click = new Click(centerMenu, centerMenuList, ".center-menu");
click.init();
handleSearchBoxEvent(centerSearchInput, centerRelativeInfo);
