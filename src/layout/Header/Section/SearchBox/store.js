import Store from '../../../../core/Store.js';
import { SEARCH_BOX } from '../../../../constant.js';
import { myLocalStorage } from '../../../../utils/mockDB.js';

const {
  INPUT_DEFAULT,
  HISTORY: { HISTORY_LOCAL_STORAGE_KEY },
} = SEARCH_BOX;

Store.prototype.requestDataToServer = async function () {
  // const { mockObj, mockArr } = await fetchData('/Mock/mockServer.json');
  // this.setState({ ...this.state, ...mockObj, mockArr });
};

const searchBoxState = {
  activeHistory: INPUT_DEFAULT,
  activeAutoTerm: INPUT_DEFAULT,
  showHistroy: true,
  showAutoComplete: false,
  option: '전체',
  inputValue: '',
  histroyList: myLocalStorage.get(HISTORY_LOCAL_STORAGE_KEY) || [],
  autoSearchList: [],
};

const searchBoxStore = new Store(searchBoxState);

await searchBoxStore.init();

export default searchBoxStore;
