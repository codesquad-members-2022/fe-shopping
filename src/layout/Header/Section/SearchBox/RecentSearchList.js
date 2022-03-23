import {
  RECENT_SEARCH_LIST,
  SEARCH_BOX,
} from '../../../../constant/htmlSelector.js';
import { moveToSearchTermPage } from '../../../../router.js';
import HtmlElement from '../../../../utils/HtmlElement.js';
import { myLocalStorage } from '../../../../utils/util.js';

const { RECENT__DELETE, RECENT__TERM, RECENT__DELETE__ALL } = SEARCH_BOX;

export default function RecentSearchList($element, args) {
  HtmlElement.call(this, $element, args);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;

RecentSearchList.prototype.setTemplate = function () {
  const { recentSearchList, activeHistory } = this.state;
  const isActive = (idx) => (idx === activeHistory ? 'active__term' : '');
  console.log(activeHistory);
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
                  data-click=${RECENT__TERM} data-term-id=${idx}>${term}
                  <span data-click=${RECENT__DELETE}>X</span>
                 </li>`
            )
            .join('')
    }
  </ul>
<div>
  <button data-click=${RECENT__DELETE__ALL}>전체삭제</button>
  <button >최근 검색어 끄기</button>
</div>`;
};

RecentSearchList.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

function handleClick({ target }) {
  const {
    dataset: { click: clickHandler },
  } = target;
  switch (clickHandler) {
    case RECENT__DELETE:
      deleteTargetTerm.call(this, target);
      break;
    case RECENT__TERM:
      moveToSearchTermPage(this.state.option, target.innerText.slice(0, -1));
      break;
    case RECENT__DELETE__ALL:
      deleteAllTerm.apply(this);
    default:
      break;
  }
}

function deleteAllTerm() {
  myLocalStorage.set(RECENT_SEARCH_LIST, []);
  this.setState({ recentSearchList: [] });
}

function deleteTargetTerm(target) {
  const updatedRecentSearchList = [...this.state.recentSearchList];
  const {
    dataset: { termId: targetTermId },
  } = target.closest('li');
  updatedRecentSearchList.splice(targetTermId, 1);
  myLocalStorage.set(RECENT_SEARCH_LIST, updatedRecentSearchList);
  this.setState({ recentSearchList: updatedRecentSearchList });
}
