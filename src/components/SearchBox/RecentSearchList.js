import { RECENT_SEARCH_LIST } from '../../constant/constant.js';
import { POP_UP } from '../../constant/htmlSelector.js';
import { moveToSearchTermPage } from '../../router.js';
import HtmlElement from '../../utils/HtmlElement.js';
import { myLocalStorage } from '../../utils/util.js';
import { SEARCH_BOX } from '../../constant/constant.js';

const { RECENT__DELETE, RECENT__TERM, RECENT__DELETE__ALL } = SEARCH_BOX;

export default function RecentSearchList(htmlTag, $parent) {
  this.state = {
    recentSearchList: myLocalStorage.get(RECENT_SEARCH_LIST) || [],
  };
  HtmlElement.call(this, htmlTag, $parent);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;

RecentSearchList.prototype.setTemplate = function () {
  this.$element.id = 'searchRecord';
  const elementClassList = ['search__record', POP_UP.hidden];
  this.$element.classList.add(...elementClassList);
  const recentSearchList = this.state.recentSearchList;
  this.$element.innerHTML = `
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
  <button class="">최근 검색어 끄기</button>
</div>`;
};

RecentSearchList.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};

RecentSearchList.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  this.setTemplate();
  this.render();
};

function handleClick({ target }) {
  switch (target.className) {
    case RECENT__DELETE:
      deleteTargetTerm.call(this, target);
      break;
    case RECENT__TERM:
      moveToSearchTermPage(target.innerText.slice(0, -1));
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
