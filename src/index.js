import { SearchZoneController } from "./EventHandler/SearchZoneEvents.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "./View/HeaderView.js";

// localStorage.setItem("localSearchHistory", "[]"); // 초기화용

const viewTest = new SearchInputToggleView(".header__main--inputWrapper");
const menuView = new SearchMenuToggleView(".header__main--inputMenuButton");

const searchZoneControllerParm = {
  inputDom: ".header__main--searchZone",
  menuDom: ".header__main--inputMenu",
  inputView: viewTest,
  menuView: menuView,
  inputSearch: ".header__main--searchInput",
};

const test = new SearchZoneController(searchZoneControllerParm);

test.initService();
