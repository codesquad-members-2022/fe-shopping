import * as domUtil from "./util/domutil.js";
import { mainController } from "./EventHandler/mainHandler.js";
import { SearchInputEventHandler } from "./EventHandler/header/SearchInputHandler.js";
import { SearchMenuEventHandler } from "./EventHandler/header/SearchMenuHandler.js";
import { HeaderRoutes } from "./routes/HeaderRoutes.js";
import { HeaderHistoryPatcher } from "./service/dataController/header/HistoryManager.js";
import { HeaderKeyboadManager } from "./service/keyInputController/HeaderKeyManager.js";
import { SearchInputView } from "./View/header/SearchInputView.js";
import { SearchMenuView } from "./View/header/searchMenuView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "./MV/Model/HeaderToggle.js";
import { ETCmovement } from "./service/etcMovement/EtcMovement.js";
import ObserverPublisher from "./observer/Observer.js/index.js";
import Store from "./MV/Store.js";

// localStorage.setItem("localSearchHistory", "[]"); // 초기화용

const INPUT = domUtil.$(".header__main--searchInput");
const MENU = domUtil.$(".header__main--inputMenuButton");
const SEARCH_INPUT_VIEW = new SearchInputView(".header__main--inputWrapper");
const SEARCH_INPUT_MODEL = new SearchInputToggle();
const SEARCH_MENU_VIEW = new SearchMenuView(".header__main--inputMenuButton");
const SEARCH_MENU_MODEL = new SearchMenuToggle();

const ETC_MOVEMENT = new ETCmovement(SEARCH_INPUT_VIEW, SEARCH_MENU_VIEW); // 추후 삭제 예정
const HEADER_KEY_MANAGER = new HeaderKeyboadManager(
  SEARCH_INPUT_VIEW,
  SEARCH_MENU_VIEW
); // 추후 삭제 예정

const HISTORY_MANAGER = new HeaderHistoryPatcher(INPUT_OBSERVER);
const ROUTER = new HeaderRoutes(INPUT_OBSERVER, MENU_OBSERVER);

const INPUT_MV_STORE = new Store({
  model: SEARCH_INPUT_MODEL,
  view: SEARCH_INPUT_VIEW,
});
const MENU_MV_STORE = new Store({
  model: SEARCH_MENU_MODEL,
  view: SEARCH_MENU_VIEW,
});

const INPUT_OBSERVER = new ObserverPublisher(null);
const MENU_OBSERVER = new ObserverPublisher(null);

INPUT_OBSERVER.addSubscrive(INPUT_MV_STORE.reduceData);
INPUT_OBSERVER.addSubscrive(INPUT_MV_STORE.renderNextState);
INPUT_OBSERVER.addSubscrive(MENU_MV_STORE.reduceData);
INPUT_OBSERVER.addSubscrive(MENU_MV_STORE.renderNextState);

const mainControllerParams = {
  searchInputHandler: new SearchInputEventHandler(
    INPUT,
    ROUTER,
    HISTORY_MANAGER,
    HEADER_KEY_MANAGER
  ),
  searchMenuHandler: new SearchMenuEventHandler(MENU, ROUTER, ETC_MOVEMENT),
};

const test = new mainController(mainControllerParams);

test.initService();
