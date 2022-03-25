import HtmlElement from '../../../../../utils/HtmlElement.js';
import { moveToSearchTermPage } from '../../../../../router.js';
import { myLocalStorage } from '../../../../../utils/mockDB.js';
import { SEARCH_BOX } from '../../../../../constant.js';

const {
  HISTORY: {
    HISTORY_DELETE,
    HISTORY_ACTIVE,
    HISTORY_DELETE__ALL,
    HISTORY_LOCAL_STORAGE_KEY,
  },
} = SEARCH_BOX;

export default function HistoryList($element, args) {
  HtmlElement.call(this, $element, args);
}

HistoryList.prototype = Object.create(HtmlElement.prototype);
HistoryList.prototype.constructor = HistoryList;

HistoryList.prototype.setTemplate = function () {
  const { histroyList, activeHistory } = this.state;
  const isActive = (idx) => (idx === activeHistory ? 'active__term' : '');
  return `
<h5>최근 검색어</h5>
<ul id="histroyList">
    ${
      histroyList.length === 0
        ? `<span>최근검색어가 없습니다.</span>`
        : histroyList
            .map(
              (term, idx) =>
                `<li class="${isActive(idx)}"
                  data-click-type=${HISTORY_ACTIVE} data-term-id=${idx}>${term}
                  <span data-click-type=${HISTORY_DELETE}>X</span>
                 </li>`
            )
            .join('')
    }
  </ul>
<div>
  <button data-click-type=${HISTORY_DELETE__ALL}>전체삭제</button>
  <button >최근 검색어 끄기</button>
</div>`;
};

HistoryList.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

function handleClick({ target }) {
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
}

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
