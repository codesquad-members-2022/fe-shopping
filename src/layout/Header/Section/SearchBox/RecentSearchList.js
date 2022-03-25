import HtmlElement from '../../../../utils/HtmlElement.js';
import { moveToSearchTermPage } from '../../../../router.js';
import { myLocalStorage } from '../../../../utils/mockDB.js';
import { SEARCH_BOX } from '../../../../constant.js';

const {
  HISTORY: {
    HISTORY_DELETE,
    HISTORY_ACTIVE,
    HISTORY_DELETE__ALL,
    HISTORY_LOCAL_STORAGE_KEY,
  },
} = SEARCH_BOX;

export default function RecentSearchList($element, args) {
  HtmlElement.call(this, $element, args);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;

RecentSearchList.prototype.setTemplate = function () {
  const { recentSearchList, activeHistory } = this.state;
  const isActive = (idx) => (idx === activeHistory ? 'active__term' : '');
  return `
<h5>최근 검색어</h5>
<ul id="recentSearchList">
    ${
      recentSearchList.length === 0
        ? `<span>최근검색어가 없습니다.</span>`
        : recentSearchList
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

RecentSearchList.prototype.setEvent = function () {
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
  this.setState({ recentSearchList: [] });
}

function deleteTargetTerm(target) {
  const updatedRecentSearchList = [...this.state.recentSearchList];
  const {
    dataset: { termId: targetTermId },
  } = target.closest('li');
  updatedRecentSearchList.splice(targetTermId, 1);
  myLocalStorage.set(HISTORY_LOCAL_STORAGE_KEY, updatedRecentSearchList);
  this.setState({ recentSearchList: updatedRecentSearchList });
}
