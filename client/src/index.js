import ObserverPublisher from "./EventHandler/eventObserver/Observer.js";
import Store from "./MV/Store.js";
import {
  defaultSearchState,
  staticInputState,
  defaultMenuState,
  staticMenuState,
} from "./MV/common/Default.js";
import { SearchInputEventHandler } from "./EventHandler/header/SearchInputHandler.js";
import { SearchMenuEventHandler } from "./EventHandler/header/SearchMenuHandler.js";
const testObserver = new ObserverPublisher();
const testStore = new Store({
  searchModelDefaultData: defaultSearchState,
  searchViewDefaultData: staticInputState,
  menuModelDefaultData: defaultMenuState,
  menuViewDefaultData: staticMenuState,
});
const testSearchController = new SearchInputEventHandler(
  testStore,
  testObserver
);
const testMenutController = new SearchMenuEventHandler(testStore, testObserver);

testSearchController.init();
testMenutController.init();

testObserver.addSubscribe(
  "incomeAutoCompleteData",
  testStore.reduceLiContents.bind(testStore)
);
testObserver.addSubscribe(
  "incomeWholeSearchHistoryData",
  testStore.reduceLiContents.bind(testStore)
);
testObserver.addSubscribe(
  "incomeNewHistory",
  testStore.reduceLiContents.bind(testStore)
);

testObserver.addSubscribe(
  "incomeHilightCount",
  testStore.reduceHilightCount.bind(testStore)
);

testObserver.addSubscribe(
  "incomeMenuData",
  testStore.reduceMenuData.bind(testStore)
);
