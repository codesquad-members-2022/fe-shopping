import { SearchZoneController } from "./EventHandler/SearchZoneEvents.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "./View/HeaderView.js";

localStorage.setItem("localSearchHistory", new Set());

const viewTest = new SearchInputToggleView(".header__main--inputWrapper");
const menuView = new SearchMenuToggleView(".header__main--inputMenuButton");

const test = new SearchZoneController(
  ".header__main--searchZone",
  ".header__main--inputMenu",
  viewTest,
  menuView,
  ".header__main--searchInput"
);

test.initService();
