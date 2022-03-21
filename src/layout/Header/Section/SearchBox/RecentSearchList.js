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
  const { recentSearchList } = this.state;
  return `
<h5>최근 검색어</h5>
<ul id="recentSearchList">
    ${
      recentSearchList.length === 0
        ? `<span>최근검색어가 없습니다.</span>`
        : recentSearchList
            .map(
              (term, idx) =>
                `<li class=${RECENT__TERM} data-term-id=${idx}>${term}<span class=${RECENT__DELETE}>X</span></li>`
            )
            .join('')
    }
  </ul>
<div>
  <button class=${RECENT__DELETE__ALL}>전체삭제</button>
  <button id="">최근 검색어 끄기</button>
</div>`;
};

RecentSearchList.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

function handleClick({ target }) {
  switch (target.className) {
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
  const targetTermId = target.closest('li').dataset.termId;
  updatedRecentSearchList.splice(targetTermId, 1);
  myLocalStorage.set(RECENT_SEARCH_LIST, updatedRecentSearchList);
  this.setState({ recentSearchList: updatedRecentSearchList });
}
