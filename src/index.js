import { SearchZoneController } from "./EventHandler/SearchZoneEvents.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "./View/HeaderView.js";

localStorage.setItem("localSearchHistory", []); // Set으로 로컬스토리지 사용하기 어떻게 해야할까?

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
