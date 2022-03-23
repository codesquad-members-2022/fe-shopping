import * as domUtil from "./util/domutil.js";
import { mainController } from "./EventHandler/mainHandler.js";
import { SearchInputEventHandler } from "./EventHandler/header/SearchInputHandler.js";
import { SearchMenuEventHandler } from "./EventHandler/header/SearchMenuHandler.js";
import { HeaderRoutes } from "./routes/HeaderRoutes.js";
import { HeaderHistoryPatcher } from "./dataDispatcher/header/HistoryManager.js";
import { HedearDataDispatcher } from "./dataDispatcher/header/DataDispatcher.js";
import { SearchInputView } from "./View/header/SearchInputView.js";
import { SearchMenuView } from "./View/header/searchMenuView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "./Components/HeaderToggle.js";

// localStorage.setItem("localSearchHistory", "[]"); // 초기화용

const INPUT = domUtil.$(".header__main--searchInput");
const MENU = domUtil.$(".header__main--inputMenuButton");
const SEARCH_INPUT_VIEW = new SearchInputView(".header__main--inputWrapper");
const SEARCH_INPUT_MODEL = new SearchInputToggle();
const SEARCH_MENU_VIEW = new SearchMenuView(".header__main--inputMenuButton");
const SEARCH_MENU_MODEL = new SearchMenuToggle();

const HISTORY_MANAGER = new HeaderHistoryPatcher(
  SEARCH_INPUT_MODEL,
  SEARCH_INPUT_VIEW
);
const DATA_DISPATCHER = new HedearDataDispatcher(
  SEARCH_INPUT_MODEL,
  SEARCH_MENU_MODEL,
  SEARCH_INPUT_VIEW,
  SEARCH_MENU_VIEW
);
const ROUTER = new HeaderRoutes(DATA_DISPATCHER);

const mainControllerParams = {
  searchInputHandler: new SearchInputEventHandler(
    INPUT,
    ROUTER,
    HISTORY_MANAGER
  ),
  searchMenuHandler: new SearchMenuEventHandler(MENU, ROUTER),
};

const test = new mainController(mainControllerParams);

test.initService();
