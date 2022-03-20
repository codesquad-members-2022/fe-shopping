import { SearchZoneController } from "./EventHandler/SearchZoneEvents.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "./View/HeaderView.js";

// localStorage.setItem("localSearchHistory", []); // Set으로 로컬스토리지 사용하기 어떻게 해야할까?

const viewTest = new SearchInputToggleView(".header__main--inputWrapper");
const menuView = new SearchMenuToggleView(".header__main--inputMenuButton");

const searchZoneControllerParm = {
  inputDom: ".header__main--searchZone",
  menuDom: ".header__main--inputMenu",
  historyRemoveBtn: ".header__main--deleteHistoryBtn",
  inputView: viewTest,
  menuView: menuView,
  inputSearch: ".header__main--searchInput",
};

const test = new SearchZoneController(searchZoneControllerParm);

test.initService();
