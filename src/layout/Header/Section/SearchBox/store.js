import Store from '../../../../core/Store.js';
import { SEARCH_BOX } from '../../../../constant.js';
import { myLocalStorage } from '../../../../utils/mockDB.js';

const {
  INPUT_DEFAULT,
  HISTORY: { HISTORY_LOCAL_STORAGE_KEY },
} = SEARCH_BOX;

const searchBoxState = {
  activeHistory: INPUT_DEFAULT,
  activeAutoTerm: INPUT_DEFAULT,
  showHistroy: false,
  option: '전체',
  inputValue: '',
  histroyList: myLocalStorage.get(HISTORY_LOCAL_STORAGE_KEY) || [],
  autoSearchList: [],
};

const searchBoxStore = new Store(searchBoxState);

await searchBoxStore.init();

export default searchBoxStore;
