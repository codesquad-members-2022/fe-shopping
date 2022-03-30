import Store from '../../core/Store.js';
import { fetchData } from '../../utils/mockDB.js';

Store.prototype.requestDataToServer = async function () {
  const { mockObj, mockArr } = await fetchData('/mock/mockServer.json');
  this.setState({ ...this.state, ...mockObj, mockArr });
};

const mainState = {
  mockArr: [],
};

const mainStore = new Store(mainState);

await mainStore.init();

export default mainStore;
