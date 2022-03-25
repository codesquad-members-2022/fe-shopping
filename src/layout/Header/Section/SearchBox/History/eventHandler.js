import { SEARCH_BOX } from '../../../../../constant.js';
import { moveToSearchTermPage } from '../../../../../router.js';
import { myLocalStorage } from '../../../../../utils/mockDB.js';

const {
  HISTORY: {
    HISTORY_DELETE,
    HISTORY_ACTIVE,
    HISTORY_DELETE__ALL,
    HISTORY_LOCAL_STORAGE_KEY,
  },
} = SEARCH_BOX;

const eventHandler = {
  handleClick({ target }) {
    const {
      dataset: { clickType },
    } = target;
    switch (clickType) {
      case HISTORY_DELETE:
        deleteTargetTerm.call(this, target);
        break;
      case HISTORY_ACTIVE:
        moveToSearchTermPage(this.state.option, target.innerText.slice(0, -1));
        break;
      case HISTORY_DELETE__ALL:
        deleteAllTerm.apply(this);
      default:
        break;
    }
  },
};

function deleteAllTerm() {
  myLocalStorage.set(HISTORY_LOCAL_STORAGE_KEY, []);
  this.setState({ histroyList: [] });
}

function deleteTargetTerm(target) {
  const updatedHistroyList = [...this.state.histroyList];
  const {
    dataset: { termId: targetTermId },
  } = target.closest('li');
  updatedHistroyList.splice(targetTermId, 1);
  myLocalStorage.set(HISTORY_LOCAL_STORAGE_KEY, updatedHistroyList);
  this.setState({ histroyList: updatedHistroyList });
}

export default eventHandler;
