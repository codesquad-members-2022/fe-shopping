import { RECENT_SEARCH_LIST } from '../../constant/constant.js';
import { POP_UP } from '../../constant/htmlSelector.js';
import { moveToSearchTermPage } from '../../router.js';
import HtmlElement from '../../utils/HtmlElement.js';
import { myLocalStorage } from '../../utils/util.js';

export default function RecentSearchList(htmlTag, $parent) {
  this.state = {
    recentSearchList: myLocalStorage.get(RECENT_SEARCH_LIST) || [],
  };
  HtmlElement.call(this, htmlTag, $parent);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;

RecentSearchList.prototype.setTemplate = function () {
  this.$element.id = 'RecentSearchList';
  const recentSearchList = this.state.recentSearchList;
  this.$element.innerHTML = `
  <div class="${POP_UP.hidden} search__record" id="searchRecord">
<h5>최근 검색어</h5>
<ul id="recentSearchList">
    ${
      recentSearchList.length === 0
        ? `<li>최근검색어가 없습니다.</li>`
        : recentSearchList
            .map(
              (term, idx) =>
                `<li data-term-id=${idx}>${term}<span>X</span></li>`
            )
            .join('')
    }
  </ul>
<div>
  <button>전체삭제</button>
  <button>최근 검색어 끄기</button>
</div>
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
  switch (target.nodeName) {
    case 'SPAN':
      deleteTargetTerm.call(this, target);
      break;
    case 'LI':
      moveToSearchTermPage(target.innerText.slice(0, -1));
      break;
    default:
      break;
  }
}

function deleteTargetTerm(target) {
  const updatedRecentSearchList = [...this.state.recentSearchList];
  const targetTermId = target.closest('li').dataset.termId;
  updatedRecentSearchList.splice(targetTermId, 1);
  myLocalStorage.set(RECENT_SEARCH_LIST, updatedRecentSearchList);
  this.setState({ recentSearchList: updatedRecentSearchList });
}
