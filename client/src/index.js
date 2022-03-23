import * as domUtil from "./util/domutil.js";
import { mainController } from "./EventHandler/mainHandler.js";
import { SearchInputEventHandler } from "./EventHandler/header/SearchInputHandler.js";
import { SearchMenuEventHandler } from "./EventHandler/header/SearchMenuHandler.js";
import { HeaderRoutes } from "./routes/HeaderRoutes.js";
import { HeaderHistoryPatcher } from "./service/dataController/header/HistoryManager.js";
import { HedearDataDispatcher } from "./service/dataController/header/DataDispatcher.js";
import { HeaderKeyboadManager } from "./service/keyInputController/HeaderKeyManager.js";
import { SearchInputView } from "./View/header/SearchInputView.js";
import { SearchMenuView } from "./View/header/searchMenuView.js";
import { SearchInputToggle, SearchMenuToggle } from "./Model/HeaderToggle.js";
import { ETCmovement } from "./service/etcMovement/EtcMovement.js";

// localStorage.setItem("localSearchHistory", "[]"); // 초기화용

const INPUT = domUtil.$(".header__main--searchInput");
const MENU = domUtil.$(".header__main--inputMenuButton");
const SEARCH_INPUT_VIEW = new SearchInputView(".header__main--inputWrapper");
const SEARCH_INPUT_MODEL = new SearchInputToggle();
const SEARCH_MENU_VIEW = new SearchMenuView(".header__main--inputMenuButton");
const SEARCH_MENU_MODEL = new SearchMenuToggle();
const ETC_MOVEMENT = new ETCmovement(SEARCH_INPUT_VIEW, SEARCH_MENU_VIEW);

const HEADER_KEY_MANAGER = new HeaderKeyboadManager(
  SEARCH_INPUT_VIEW,
  SEARCH_MENU_VIEW
);
const HISTORY_MANAGER = new HeaderHistoryPatcher(
  SEARCH_INPUT_MODEL,
  SEARCH_INPUT_VIEW,
  HEADER_KEY_MANAGER // 상위의 객체는 하위를 바라보지 않지만 동등한 계층끼리는 바라볼수 있는 룰을 적용했는데 같은계층끼리 바라보니깐 어색하다
);
const DATA_DISPATCHER = new HedearDataDispatcher(
  SEARCH_INPUT_MODEL,
  SEARCH_MENU_MODEL,
  SEARCH_INPUT_VIEW,
  SEARCH_MENU_VIEW,
  HEADER_KEY_MANAGER //흠
);

const ROUTER = new HeaderRoutes(DATA_DISPATCHER);

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
